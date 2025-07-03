import mongoose from "mongoose";
import { apiError, apiResponse, asyncHandler, Greige } from "../allImports.js";

const filterGreigeOrder = asyncHandler(async (request, response) => {
    const { fabricName, orderNo } = request.body;

    if (!fabricName && !orderNo) {
        throw new apiError(400, "Select at least one field to filter");
    }

    const filter = {};

    if (fabricName) {
        filter.fabricName = { $regex: new RegExp(`^${fabricName}$`, "i") };
    };

    if (orderNo) {
        filter.orderNo = { $regex: new RegExp(`^${orderNo}$`, "i") };
    };

    const filteredGreigeOrders = await Greige.find(filter).populate("unit3OrderId").select("-greigeCreator -unit3Creator");

    return response.status(200).json(
        new apiResponse(200, {filteredGreigeOrders, totalGreigeOrders: filteredGreigeOrders.length}, "Filtered orders fetched")
    );
});

export { filterGreigeOrder };
