import { apiResponse, asyncHandler, Greige } from "../allImports.js";

const getGreigeOrders = asyncHandler(async (request, response) => {
    const limit = parseInt(request.query.limit) || 20;
    const page = parseInt(request.query.page) || 1;
    const skip = (page - 1) * limit;

    const totalOrders = await Greige.countDocuments({
        greigeCreator: request.user.id,
    });

    const greigeOrders = await Greige.find({
        greigeCreator: request.user.id,
    })
    .limit(limit)
    .skip(skip)
    .sort({ createdAt: -1 }).select("-greigeCreator");

    return response.status(200)
    .json(
        new apiResponse(200, {currentPage: page, totalPages: Math.ceil(totalOrders / limit), totalOrders, data: greigeOrders,}, "Greige orders fetched")
    )
});

export { getGreigeOrders };
