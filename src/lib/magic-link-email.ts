import "server-only";
import { Resend } from "resend";

const APP_NAME = "GOF.ai";

export async function sendMagicLinkEmail({ to, url }: { to: string; url: string }) {
  const apiKey = process.env.AUTH_RESEND_KEY;
  const from = process.env.EMAIL_FROM;
  if (!apiKey || !from) throw new Error("AUTH_RESEND_KEY and EMAIL_FROM must be set to send sign-in links.");

  const { error } = await new Resend(apiKey).emails.send({
    from,
    to,
    subject: `Sign in to ${APP_NAME}`,
    html: html(url),
    text: `Sign in to ${APP_NAME}\n\nOpen this link to sign in:\n${url}\n\nThe link works once and expires in 24 hours. If you didn't ask for it, you can ignore this email.\n`,
  });
  if (error) throw new Error(`Resend could not send the sign-in email: ${error.message}`);
}

function html(url: string) {
  const safeUrl = url.replace(/"/g, "&quot;");
  return `<!doctype html>
<html>
  <body style="margin:0;padding:32px 16px;background:#f4f4f5;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;color:#18181b">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
      <tr><td align="center">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:440px;background:#ffffff;border-radius:12px;padding:32px">
          <tr><td style="font-size:20px;font-weight:600;padding-bottom:8px">Sign in to ${APP_NAME}</td></tr>
          <tr><td style="font-size:15px;line-height:22px;color:#52525b;padding-bottom:24px">Click the button below to sign in. The link works once and expires in 24 hours.</td></tr>
          <tr><td style="padding-bottom:24px">
            <a href="${safeUrl}" style="display:inline-block;background:#18181b;color:#ffffff;text-decoration:none;font-size:15px;font-weight:600;padding:12px 20px;border-radius:8px">Sign in</a>
          </td></tr>
          <tr><td style="font-size:13px;line-height:20px;color:#71717a">If you didn't ask for this email, you can ignore it.</td></tr>
        </table>
      </td></tr>
    </table>
  </body>
</html>`;
}
