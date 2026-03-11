import { headers } from "next/headers";
import { redirect } from "next/navigation";

/**
 * Live Preview Route for Payload CMS
 * This route is called by Payload CMS admin panel to preview posts
 * It generates a preview URL based on the post's slug and published date
 */
export async function GET(request: Request) {
  const headersList = await headers();
  const searchParams = new URL(request.url).searchParams;

  // Get preview data from query parameters
  const slug = searchParams.get("slug");
  const publishedDate = searchParams.get("publishedDate");
  const token = searchParams.get("token");

  // Validate required fields
  if (!slug || !publishedDate) {
    return new Response(
      JSON.stringify({
        error: "Missing required parameters: slug and publishedDate",
      }),
      { status: 400, headers: { "content-type": "application/json" } },
    );
  }

  try {
    // Parse the published date
    const date = new Date(publishedDate);

    if (isNaN(date.getTime())) {
      return new Response(
        JSON.stringify({
          error: "Invalid publishedDate format",
        }),
        { status: 400, headers: { "content-type": "application/json" } },
      );
    }

    // Generate the preview URL based on the date and slug
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    const previewUrl = `/${year}/${month}/${day}/${slug}`;

    // Redirect to the preview page
    redirect(previewUrl);
  } catch (error) {
    console.error("Preview generation error:", error);
    return new Response(
      JSON.stringify({
        error: "Failed to generate preview URL",
      }),
      { status: 500, headers: { "content-type": "application/json" } },
    );
  }
}
