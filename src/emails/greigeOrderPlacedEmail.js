import { sendMail } from "../utils/sendEmail.js";
import dayjs from "dayjs";

const greigeOrderPlacedEmail = async ({
  recipientName,
  recipientEmail,
  orderDate,
  orderNo,
  fabricName,
  requiredAmount,
  location,
  deliveryDate,
  remarks,
  recd,
  balance,
  stock,
}) => {
  const subject = `🧾 Greige Order #${orderNo} Placed – Jasmine Automate`;

  const fmtOrderDate = orderDate ? dayjs(orderDate).format("D MMMM YYYY") : "";
  const fmtDeliveryDate = deliveryDate
    ? dayjs(deliveryDate).format("D MMMM YYYY")
    : "";

  const htmlBody = `
  <div style="max-width:600px;margin:auto;border:1px solid #e0e0e0;border-radius:8px;font-family:'Segoe UI',Tahoma,Geneva,Verdana,sans-serif;background:#f9f9f9;color:#333;">
    <div style="background:#0047AB;color:#fff;padding:20px 30px;border-radius:8px 8px 0 0;">
      <h2 style="margin:0;font-weight:600;">Jasmine Automate</h2>
      <p style="margin:5px 0 0;">New Greige Order Placed</p>
    </div>

    <div style="padding:30px;">
      <p style="font-size:16px;">Hi <strong>${recipientName}</strong>,</p>
      <p style="font-size:15px;">We’ve just logged a new greige order in the system. Details are below:</p>

      <table style="width:100%;margin-top:25px;border-collapse:collapse;font-size:14px;">
        <tr>
          <td style="padding:12px;border:1px solid #ddd;background:#f1f5fb;"><strong>Order No</strong></td>
          <td style="padding:12px;border:1px solid #ddd;">${orderNo}</td>
        </tr>
        ${
          fmtOrderDate
            ? `
        <tr>
          <td style="padding:12px;border:1px solid #ddd;background:#f1f5fb;"><strong>Order Date</strong></td>
          <td style="padding:12px;border:1px solid #ddd;">${fmtOrderDate}</td>
        </tr>`
            : ""
        }
        <tr>
          <td style="padding:12px;border:1px solid #ddd;background:#f1f5fb;"><strong>Fabric</strong></td>
          <td style="padding:12px;border:1px solid #ddd;">${fabricName}</td>
        </tr>
        <tr>
          <td style="padding:12px;border:1px solid #ddd;background:#f1f5fb;"><strong>Required Amount</strong></td>
          <td style="padding:12px;border:1px solid #ddd;">${requiredAmount}</td>
        </tr>
        <tr>
          <td style="padding:12px;border:1px solid #ddd;background:#f1f5fb;"><strong>Location</strong></td>
          <td style="padding:12px;border:1px solid #ddd;">${location}</td>
        </tr>
        ${
          fmtDeliveryDate
            ? `
        <tr>
          <td style="padding:12px;border:1px solid #ddd;background:#f1f5fb;"><strong>Delivery Date</strong></td>
          <td style="padding:12px;border:1px solid #ddd;">${fmtDeliveryDate}</td>
        </tr>`
            : ""
        }
        ${
          remarks
            ? `
        <tr>
          <td style="padding:12px;border:1px solid #ddd;background:#f1f5fb;"><strong>Remarks</strong></td>
          <td style="padding:12px;border:1px solid #ddd;">${remarks}</td>
        </tr>`
            : ""
        }
        ${
          recd !== undefined
            ? `
        <tr>
          <td style="padding:12px;border:1px solid #ddd;background:#f1f5fb;"><strong>Received</strong></td>
          <td style="padding:12px;border:1px solid #ddd;">${recd}</td>
        </tr>`
            : ""
        }
        ${
          balance !== undefined
            ? `
        <tr>
          <td style="padding:12px;border:1px solid #ddd;background:#f1f5fb;"><strong>Balance</strong></td>
          <td style="padding:12px;border:1px solid #ddd;">${balance}</td>
        </tr>`
            : ""
        }
        ${
          stock !== undefined
            ? `
        <tr>
          <td style="padding:12px;border:1px solid #ddd;background:#f1f5fb;"><strong>Stock(Greige)</strong></td>
          <td style="padding:12px;border:1px solid #ddd;">${stock}</td>
        </tr>`
            : ""
        }
      </table>

      <div style="text-align:center;margin:30px 0;">
        <a href="https://order-delivery-system.vercel.app" target="_blank" style="
            display:inline-block;
            padding:12px 24px;
            background:#0047AB;
            color:#fff;
            text-decoration:none;
            border-radius:6px;
            font-weight:600;
            font-size:15px;
            box-shadow:0 2px 6px rgba(0,0,0,.15);
        ">Go to Dashboard</a>
      </div>

      <p style="font-size:14px;">Log in to your PK Automate dashboard any time to track order progress.</p>

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

export default greigeOrderPlacedEmail;
