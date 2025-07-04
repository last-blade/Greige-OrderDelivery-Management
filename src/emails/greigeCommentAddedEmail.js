import { sendMail } from "../utils/sendEmail.js";
import dayjs from "dayjs";

const greigeCommentAddedEmail = async ({
  recipientName,
  recipientEmail,
  greigeOrderNo,
  fabricName,
  location,
  comment,
  commentorName,
  createdAt = new Date(),
}) => {
  const subject = `💬 New Comment on Greige Order #${greigeOrderNo}`;

  const formattedDate = dayjs(createdAt).format("D MMM YYYY, h:mm A");

  const htmlBody = `
  <div style="max-width:600px;margin:auto;border:1px solid #e0e0e0;border-radius:8px;font-family:'Segoe UI',Tahoma,Geneva,Verdana,sans-serif;background:#fefefe;color:#333;">
    <div style="background:#1976D2;color:#fff;padding:20px 30px;border-radius:8px 8px 0 0;">
      <h2 style="margin:0;font-weight:600;">Jasmine Automate</h2>
      <p style="margin:5px 0 0;">New Comment Added</p>
    </div>

    <div style="padding:30px;">
      <p style="font-size:16px;">Hi <strong>${recipientName}</strong>,</p>
      <p style="font-size:15px;">A new comment has been added to the following Greige order by <strong>${commentorName}</strong>:</p>

      <table style="width:100%;margin-top:20px;border-collapse:collapse;font-size:14px;">
        <tr>
          <td style="padding:12px;border:1px solid #ddd;background:#f1f5fb;"><strong>Order No</strong></td>
          <td style="padding:12px;border:1px solid #ddd;">${greigeOrderNo}</td>
        </tr>
        <tr>
          <td style="padding:12px;border:1px solid #ddd;background:#f1f5fb;"><strong>Fabric</strong></td>
          <td style="padding:12px;border:1px solid #ddd;">${fabricName}</td>
        </tr>
        <tr>
          <td style="padding:12px;border:1px solid #ddd;background:#f1f5fb;"><strong>Location</strong></td>
          <td style="padding:12px;border:1px solid #ddd;">${location}</td>
        </tr>
      </table>

      <div style="margin-top:30px;padding:20px;border:1px solid #ddd;background:#f9f9f9;border-radius:6px;">

        <p style="margin-top:10px;font-size:15px;font-style:italic;">"${comment}"</p>
      </div>

      <div style="text-align:center;margin:30px 0;">
        <a href="https://order-delivery-system.vercel.app" target="_blank" style="
            display:inline-block;
            padding:12px 24px;
            background:#1976D2;
            color:#fff;
            text-decoration:none;
            border-radius:6px;
            font-weight:600;
            font-size:15px;
            box-shadow:0 2px 6px rgba(0,0,0,.15);
        ">Go to Dashboard</a>
      </div>

      <p style="margin-top:40px;font-size:14px;">Regards,</p>
      <p style="font-weight:600;font-size:15px;">Jasmine Automate<br/>Communication Team</p>
    </div>

    <div style="background:#f1f1f1;color:#777;text-align:center;padding:15px;border-top:1px solid #ddd;border-radius:0 0 8px 8px;font-size:12px;">
      <p style="margin:0;">© ${new Date().getFullYear()} Jasmine Automate. All rights reserved.</p>
    </div>
  </div>
  `;

  await sendMail(recipientEmail, subject, htmlBody);
};

export default greigeCommentAddedEmail;
