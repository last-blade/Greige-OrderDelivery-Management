import { apiError, apiResponse, asyncHandler, Greige } from "../allImports.js";

const viewGreigeOrder = asyncHandler(async (request, response) => {
    const {orderId} = request.params;

    if(!orderId){
        throw new apiError(400, "Order ID not found")
    }

    const foundGreigeOrder = await Greige.findById(orderId).populate("unit3OrderId").select("-greigeCreator -unit3Creator");

    if(!foundGreigeOrder){
        throw new apiError(404, "Greige order not found")
    }

    return response.status(200)
    .json(
        new apiResponse(200, foundGreigeOrder, "Greige order fetched")
    )

});

export {viewGreigeOrder}