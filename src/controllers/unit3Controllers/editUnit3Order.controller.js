import { apiError, apiResponse, asyncHandler, Greige, Unit3 } from "../allImports.js";

const editUnit3Order = asyncHandler(async (request, response) => {
    const {orderId} = request.params;
    const {stock, plannedQuantity, estimatedDeliveryDate, revisedEstimatedDeliveryDate1, revisedEstimatedDeliveryDate2, days} = request.body;

    if([stock, plannedQuantity, estimatedDeliveryDate, days].some(inputField => inputField === undefined || inputField.trim === "")){
        throw new apiError(400, "All fields are required")
    }

    if(!orderId){
        throw new apiError(400, "Order ID required")
    }

    const foundGreigeOrder = await Greige.findById(orderId);

    if(!foundGreigeOrder){
        throw new apiError(404, "Greige order not found")
    }

    const updatedUnit3Order = await Unit3.findByIdAndUpdate(foundGreigeOrder.unit3OrderId, {
        $set: {
            stock, 
            plannedQuantity, 
            estimatedDeliveryDate, 
            revisedEstimatedDeliveryDate1, 
            revisedEstimatedDeliveryDate2, 
            days,
        }
    }, {new: true}).populate("greigeOrderId").select("-greigeCreator");

    return response.status(200)
    .json(
        new apiResponse(200, updatedUnit3Order, "Greige order updated")
    )

});

export {editUnit3Order}