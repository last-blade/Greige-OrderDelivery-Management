import { apiError, apiResponse, asyncHandler, Greige } from "../allImports.js";

const createGreigeOrder = asyncHandler(async (request, response) => {
    const {orderDate, orderNo, fabricName, requiredAmount, location, deliveryDate, remarks, recd, balance} = request.body;

    if([orderDate, orderNo, fabricName, requiredAmount, location, deliveryDate].some(inputField => inputField === undefined || inputField.trim() === "")){
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
        greigeCreator: request.user.id,
    });

    const foundGreigeOrder = await Greige.findById(greigeOrder?._id).select("-greigeCreator");

    if(!foundGreigeOrder){
        throw new apiError(500, "Something went wrong while creating greige order")
    }

    return response.status(201)
    .json(
        new apiResponse(201, foundGreigeOrder, "Greige order placed")
    )

});

export {createGreigeOrder}