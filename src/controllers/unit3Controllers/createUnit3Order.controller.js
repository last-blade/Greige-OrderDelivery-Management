import { apiError, apiResponse, asyncHandler, Greige, Unit3 } from "../allImports.js";

const createUnit3Order = asyncHandler(async (request, response) => {
    const {orderId} = request.params;

    const {stock, plannedQuantity, estimatedDeliveryDate, revisedEstimatedDeliveryDate1, revisedEstimatedDeliveryDate2, days} = request.body;

    if(!orderId){
        throw new apiError(400, "Order ID is required")
    }

    if([stock, plannedQuantity, estimatedDeliveryDate, days].some(inputField => inputField === undefined || inputField.trim === "")){
        throw new apiError(400, "All fields are required")
    }

    const foundGreigeOrder = await Greige.findById(orderId);

    if(!foundGreigeOrder){
        throw new apiError(404, "Greige order not found")
    }

    const createdUnit3Order = await Unit3.create({
        stock, 
        plannedQuantity, 
        estimatedDeliveryDate, 
        revisedEstimatedDeliveryDate1, 
        revisedEstimatedDeliveryDate2, 
        days,
        greigeOrderId: foundGreigeOrder._id,
        unit3Creator: request.user.id,
    });

    foundGreigeOrder.unit3OrderId = createdUnit3Order._id;
    foundGreigeOrder.save({validateBeforeSave: false});

    const foundUnit3Order = await Unit3.findById(createdUnit3Order._id).populate("greigeOrderId").select("-greigeCreator");
    
    return response.status(201)
    .json(
        new apiResponse(201, foundUnit3Order, "Unit3 message created")
    )

});

export {createUnit3Order}