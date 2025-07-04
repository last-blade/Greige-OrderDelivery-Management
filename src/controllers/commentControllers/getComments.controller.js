import { apiResponse, asyncHandler, Comment, Greige } from "../allImports.js";

const getComments = asyncHandler(async (request, response) => {
    const {orderId} = request.params;

    if(!orderId){
        throw new apiError(400, "Order ID not found")
    }

    const foundGreigeOrder = await Greige.findById(orderId);

    if(!foundGreigeOrder){
        throw new apiError(404, "Greige order not found")
    }

    const comments = await Comment.find({
        commentedOrder: orderId,
    }).select("-commentor").populate("commentor", "fullName");

    return response.status(200)
    .json(
        new apiResponse(200, comments, "Comments fetched")
    )

});

export {getComments}