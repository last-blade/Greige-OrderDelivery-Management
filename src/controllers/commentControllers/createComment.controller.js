import { apiResponse, asyncHandler, Comment, Greige } from "../allImports.js";

const createComment = asyncHandler(async (request, response) => {
    const {orderId} = request.params;
    const {comment} = request.body;

    if(!orderId){
        throw new apiError(400, "Order ID not found")
    }

    const foundGreigeOrder = await Greige.findById(orderId);

    if(!foundGreigeOrder){
        throw new apiError(404, "Greige order not found")
    }

    const createdComment = await Comment.create({
        comment,
        commentor: request.user.id,
        commentedOrder: orderId,
    });

    const foundComment = await Comment.findById(createdComment._id).populate("commentor", "fullName");

    return response.status(201)
    .json(
        new apiResponse(201, foundComment, `Commented on: ${foundGreigeOrder.orderNo}`)
    )

});

export {createComment}