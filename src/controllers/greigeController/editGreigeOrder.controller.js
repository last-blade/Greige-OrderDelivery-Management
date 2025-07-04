import greigeOrderUpdatedEmail from "../../emails/greigeOrderUpdatedEmail.js";
import { apiError, apiResponse, asyncHandler, Greige } from "../allImports.js";

const editGreigeOrder = asyncHandler(async (request, response) => {
    const {orderId} = request.params;
    const {orderDate, orderNo, fabricName, requiredAmount, location, deliveryDate, remarks, recd, balance, days} = request.body;

    if([orderDate, orderNo, fabricName, requiredAmount, location, deliveryDate, days].some(inputField => inputField === undefined || inputField.trim === "")){
        throw new apiError(400, "All fields are required")
    }

    if(!orderId){
        throw new apiError(400, "Order ID required")
    }

    const foundGreigeOrder = await Greige.findById(orderId);

    if(!foundGreigeOrder){
        throw new apiError(404, "Greige order not found")
    }

    const updatedGreigeOrder = await Greige.findByIdAndUpdate(orderId, {
        $set: {
            orderDate, 
            orderNo, 
            fabricName, 
            requiredAmount, 
            location, 
            deliveryDate, 
            remarks, 
            recd, 
            balance,
            days,
        }
    }, {new: true}).populate("unit3OrderId").select("-greigeCreator -unit3Creator");

    await greigeOrderUpdatedEmail({
        recipientName: "UNIT3",
        recipientEmail: "sunny@natharts.com",
        orderDate,
        orderNo,
        fabricName,
        requiredAmount,
        location,
        deliveryDate,
        remarks,
        recd,
        balance,
        days,
    });

    return response.status(200)
    .json(
        new apiResponse(200, updatedGreigeOrder, "Greige order updated")
    )

});

export {editGreigeOrder}