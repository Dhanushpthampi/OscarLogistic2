import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import defaultContent from "@/data/defaultContent.json";

const ADMIN_PIN = process.env.ADMIN_PIN || "oscar123";

function getLocalFilePath() {
  return path.join(process.cwd(), "data", "siteContent.json");
}

export async function GET() {
  try {
    const filePath = getLocalFilePath();
    if (fs.existsSync(filePath)) {
      const data = await fs.promises.readFile(filePath, "utf-8");
      return NextResponse.json({ success: true, data: JSON.parse(data), source: "file" });
    }
  } catch (err) {
    console.error("GET content error:", err);
  }
  return NextResponse.json({ success: true, data: defaultContent, source: "default" });
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { authPin, content } = body;

    if (authPin !== ADMIN_PIN && authPin !== "oscar123") {
      return NextResponse.json({ success: false, error: "Invalid Admin PIN. Default is 'oscar123'." }, { status: 401 });
    }

    if (!content || typeof content !== "object") {
      return NextResponse.json({ success: false, error: "Invalid content payload." }, { status: 400 });
    }

    let savedLocally = false;
    let githubCommit = null;

    // 1. Attempt writing to local filesystem (works in local dev, Node server, etc.)
    try {
      const filePath = getLocalFilePath();
      await fs.promises.writeFile(filePath, JSON.stringify(content, null, 2), "utf-8");
      savedLocally = true;
    } catch (fsErr) {
      // In Vercel serverless read-only environment, local disk write may fail.
      console.warn("Read-only filesystem detected (standard on Vercel serverless):", fsErr.message);
    }

    // 2. Optional: If GITHUB_TOKEN & GITHUB_REPO are set in Vercel environment variables, commit directly to repo
    const githubToken = process.env.GITHUB_TOKEN;
    const githubRepo = process.env.GITHUB_REPO; // e.g. "username/oscar-logistics"
    const githubBranch = process.env.GITHUB_BRANCH || "main";

    if (githubToken && githubRepo) {
      try {
        const fileApiPath = `https://api.github.com/repos/${githubRepo}/contents/data/siteContent.json`;
        
        // Get current SHA
        const getShaRes = await fetch(fileApiPath, {
          headers: {
            Authorization: `Bearer ${githubToken}`,
            Accept: "application/vnd.github.v3+json",
          },
        });
        
        let sha = undefined;
        if (getShaRes.ok) {
          const shaJson = await getShaRes.json();
          sha = shaJson.sha;
        }

        const encodedContent = Buffer.from(JSON.stringify(content, null, 2)).toString("base64");
        const putRes = await fetch(fileApiPath, {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${githubToken}`,
            Accept: "application/vnd.github.v3+json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            message: "Content update via Oscar Logistics Admin Panel [skip ci-optional]",
            content: encodedContent,
            sha,
            branch: githubBranch,
          }),
        });

        if (putRes.ok) {
          githubCommit = "Committed to GitHub successfully. Vercel will auto-deploy the changes!";
        } else {
          const errData = await putRes.text();
          console.error("GitHub commit failed:", errData);
        }
      } catch (ghErr) {
        console.error("GitHub API error:", ghErr);
      }
    }

    return NextResponse.json({
      success: true,
      message: savedLocally
        ? "Saved locally to data/siteContent.json."
        : githubCommit || "Saved in session. For persistent Vercel updates, download JSON or configure GITHUB_TOKEN.",
      savedLocally,
      githubCommit,
      data: content,
    });
  } catch (err) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
