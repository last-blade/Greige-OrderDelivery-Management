import greigeOrderPlacedEmail from "../../emails/greigeOrderPlacedEmail.js";
import { apiError, apiResponse, asyncHandler, Greige } from "../allImports.js";

const createGreigeOrder = asyncHandler(async (request, response) => {
    const {orderDate, orderNo, fabricName, requiredAmount, location, deliveryDate, remarks, recd, balance, greigeStock} = request.body;

    if([orderDate, orderNo, fabricName, requiredAmount, location, deliveryDate].some(inputField => inputField === undefined || inputField.trim === "")){
        throw new apiError(400, "All fields are required")
    }

    const greigeOrder = await Greige.create({
        orderDate, 
        orderNo, 
        fabricName, 
        requiredAmount, 
        location, 
        deliveryDate, 
        remarks, 
        recd, 
        balance,
        greigeStock,
        greigeCreator: request.user.id,
    });

    const foundGreigeOrder = await Greige.findById(greigeOrder?._id).select("-greigeCreator");

    if(!foundGreigeOrder){
        throw new apiError(500, "Something went wrong while creating greige order")
    }

    await greigeOrderPlacedEmail({
        recipientName: "UNIT3",
        recipientEmail: "sunny@natharts.com",
        orderDate: foundGreigeOrder.orderDate,
        orderNo: foundGreigeOrder.orderNo,
        fabricName: foundGreigeOrder.fabricName,
        requiredAmount: foundGreigeOrder.requiredAmount,
        location: foundGreigeOrder.location,
        deliveryDate: foundGreigeOrder.deliveryDate,
        remarks: foundGreigeOrder.remarks,
        recd: foundGreigeOrder.recd,
        balance: foundGreigeOrder.balance,
        greigeStock: foundGreigeOrder.greigeStock,
    });

    return response.status(201)
    .json(
        new apiResponse(201, foundGreigeOrder, "Greige order placed")
    )

});

export {createGreigeOrder}