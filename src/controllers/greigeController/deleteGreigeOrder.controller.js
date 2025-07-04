import { apiError, apiResponse, asyncHandler, Greige, Unit3 } from "../allImports.js";

const deleteGreigeOrder = asyncHandler(async (request, response) =>{
    const {orderId} = request.params;

    if(!orderId){
        throw new apiError(400, "Greige order ID is required")
    }

    const foundGreigeOrder = await Greige.findById(orderId);

    if(!foundGreigeOrder){
        throw new apiError(404, "Greige order not found maybe already deleted")
    }

    const unit3OrderId = foundGreigeOrder.unit3OrderId;

    if(unit3OrderId){
        await Unit3.findByIdAndDelete(unit3OrderId);
    }

    await Greige.findByIdAndDelete(orderId);

    return response.status(200)
    .json(
        new apiResponse(200, {}, "Greige order deleted")
    )

});

export {deleteGreigeOrder}