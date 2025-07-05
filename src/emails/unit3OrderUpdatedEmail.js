import { sendMail } from "../utils/sendEmail.js";
import dayjs from "dayjs";

const unit3OrderUpdatedEmail = async ({
  recipientName,
  recipientEmail,
  greigeOrderNo,
  fabricName,
  stock,
  plannedQuantity,
  estimatedDeliveryDate,
  revisedEstimatedDeliveryDate1,
  revisedEstimatedDeliveryDate2,
  days,
}) => {
  const subject = `✏️ Unit 3 Order Updated – Greige #${greigeOrderNo}`;

  const formattedEstimated = estimatedDeliveryDate
    ? dayjs(estimatedDeliveryDate).format("D MMMM YYYY")
    : "";
  const formattedRev1 = revisedEstimatedDeliveryDate1
    ? dayjs(revisedEstimatedDeliveryDate1).format("D MMMM YYYY")
    : "";
  const formattedRev2 = revisedEstimatedDeliveryDate2
    ? dayjs(revisedEstimatedDeliveryDate2).format("D MMMM YYYY")
    : "";

  const htmlBody = `
  <div style="max-width:600px;margin:auto;border:1px solid #e0e0e0;border-radius:8px;font-family:'Segoe UI',Tahoma,Geneva,Verdana,sans-serif;background:#f9f9f9;color:#333;">
    <div style="background:#FFA500;color:#fff;padding:20px 30px;border-radius:8px 8px 0 0;">
      <h2 style="margin:0;font-weight:600;">Jasmine Automate</h2>
      <p style="margin:5px 0 0;">Unit 3 Order Updated</p>
    </div>

    <div style="padding:30px;">
      <p style="font-size:16px;">Hi <strong>${recipientName}</strong>,</p>
      <p style="font-size:15px;">A Unit 3 order linked to the following Greige order has been updated:</p>

      <table style="width:100%;margin-top:25px;border-collapse:collapse;font-size:14px;">
        <tr>
          <td style="padding:12px;border:1px solid #ddd;background:#f1f5fb;"><strong>Greige Order No</strong></td>
          <td style="padding:12px;border:1px solid #ddd;">${greigeOrderNo}</td>
        </tr>
        <tr>
          <td style="padding:12px;border:1px solid #ddd;background:#f1f5fb;"><strong>Fabric Name</strong></td>
          <td style="padding:12px;border:1px solid #ddd;">${fabricName}</td>
        </tr>
        <tr>
          <td style="padding:12px;border:1px solid #ddd;background:#f1f5fb;"><strong>Stock(Unit3)</strong></td>
          <td style="padding:12px;border:1px solid #ddd;">${stock}</td>
        </tr>
        <tr>
          <td style="padding:12px;border:1px solid #ddd;background:#f1f5fb;"><strong>Planned Quantity</strong></td>
          <td style="padding:12px;border:1px solid #ddd;">${plannedQuantity}</td>
        </tr>
        ${
          formattedEstimated
            ? `<tr><td style="padding:12px;border:1px solid #ddd;background:#f1f5fb;"><strong>Estimated Delivery</strong></td>
               <td style="padding:12px;border:1px solid #ddd;">${formattedEstimated}</td></tr>`
            : ""
        }
        ${
          formattedRev1
            ? `<tr><td style="padding:12px;border:1px solid #ddd;background:#f1f5fb;"><strong>Revised Delivery 1</strong></td>
               <td style="padding:12px;border:1px solid #ddd;">${formattedRev1}</td></tr>`
            : ""
        }
        ${
          formattedRev2
            ? `<tr><td style="padding:12px;border:1px solid #ddd;background:#f1f5fb;"><strong>Revised Delivery 2</strong></td>
               <td style="padding:12px;border:1px solid #ddd;">${formattedRev2}</td></tr>`
            : ""
        }
        <tr>
          <td style="padding:12px;border:1px solid #ddd;background:#f1f5fb;"><strong>Total Days</strong></td>
          <td style="padding:12px;border:1px solid #ddd;">${days}</td>
        </tr>
      </table>

      <div style="text-align:center;margin:30px 0;">
        <a href="https://order-delivery-system.vercel.app" target="_blank" style="
            display:inline-block;
            padding:12px 24px;
            background:#FFA500;
            color:#fff;
            text-decoration:none;
            border-radius:6px;
            font-weight:600;
            font-size:15px;
            box-shadow:0 2px 6px rgba(0,0,0,.15);
        ">Go to Dashboard</a>
      </div>

      <p style="font-size:14px;">Please review the updated details in your dashboard.</p>

      <p style="margin-top:40px;font-size:14px;">Warm regards,</p>
      <p style="font-weight:600;font-size:15px;">Jasmine Automate<br/>Operations Team</p>
    </div>

    <div style="background:#f1f1f1;color:#777;text-align:center;padding:15px;border-top:1px solid #ddd;border-radius:0 0 8px 8px;font-size:12px;">
      <p style="margin:0;">© ${new Date().getFullYear()} Jasmine Automate. All rights reserved.</p>
    </div>
  </div>
  `;

  await sendMail(recipientEmail, subject, htmlBody);
};

export default unit3OrderUpdatedEmail;