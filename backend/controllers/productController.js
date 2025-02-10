const Product = require("../models/productModel");
const ErrorHandler = require("../utils/errorhandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ApiFeatures = require("../utils/apiFeatures");
const cloudinary = require("cloudinary").v2

// create product -- Admin
exports.createProduct = catchAsyncErrors(async (req, res, next) => {
  const uploadedFiles = req.files.images;
  const fileArray = Array.isArray(uploadedFiles) ? uploadedFiles : [uploadedFiles];
  const uploadedImages = [];
  for (const file of fileArray) {
    const fileUri = getDataUri(file);
    const myCloud = await cloudinary.uploader.upload(fileUri.content, { folder: 'ByteProducts' });
    uploadedImages.push({
      public_id: myCloud.public_id,
      url: myCloud.url,
    });
  }
  const productData = {
    ...req.body,
    images: uploadedImages,
    user: req.user.id,
  };
  const product = await Product.create(productData);
  res.status(201).json({
    success: true,
    product,
  });
});

// Get All product
exports.getAllProducts = catchAsyncErrors(async (req, res) => {
  let apiFeature = new ApiFeatures(Product.find(), req.query)
    .search()
    .filter()
    .condition();

  const filteredProductsCount = await apiFeature.query.clone().countDocuments(); // Get count after filtering

  apiFeature = apiFeature.paginate();

  const products = await apiFeature.query;

  res.status(200).json({
    success: true,
    products,
    filteredProductsCount,
    page: parseInt(req.query.page, 10) || 1,
    limit: parseInt(req.query.limit, 10) || 8,
  });
});



exports.getAdminProducts = catchAsyncErrors(async (req, res, next) => {
  const products = await Product.find();

  res.status(200).json({
    success: true,
    products,
  });
});

exports.updatedProductStock = catchAsyncErrors(async (req, res, next) => {
  const { quantityShipped, productId } = req.body;
  let product = await Product.findById(productId);
  if (!product) {
    return res.status(500).json({
      success: false,
      message: "Product not found",
    });
  }
  product.stock = product.stock - quantityShipped;
  await product.save({ validateBeforeSave: false });
  res.status(200).json({
    success: true,
    message: "Product stock updated successfully",
    product,
  });
})

// Update product --Admin
exports.updateProduct = catchAsyncErrors(async (req, res, next) => {
  if (req.files?.images) {
    const uploadedFiles = req.files.images;
    const fileArray = Array.isArray(uploadedFiles) ? uploadedFiles : [uploadedFiles];
    const uploadedImages = [];
    for (const file of fileArray) {
      const fileUri = getDataUri(file);
      const myCloud = await cloudinary.uploader.upload(fileUri.content, { folder: 'uploads' });
      uploadedImages.push({
        public_id: myCloud.public_id,
        url: myCloud.url,
      });
    }
    req.body.images = uploadedImages;
  }
  let product = await Product.findById(req.params.id);
  if (!product) {
    return res.status(500).json({
      success: false,
      message: "Product not found",
    });
  }
  product = await Product.findByIdAndUpdate(req.params.id, { ...req.body }, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });
  res.status(200).json({
    success: true,
    product,
  });
});

// Delete product --Admin
exports.deleteProduct = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    return res.status(500).json({
      success: false,
      message: "Product not found",
    });
  }
  await product.deleteOne({ _id: req.params.id });

  res.status(200).json({
    success: true,
    Message: "product deleted successfully",
  });
});

// Get One product
exports.getProduct = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    return next(new ErrorHandler("product not found", 404));
  }
  res.status(200).json({
    success: true,
    product,
  });
});

//Create New Review or Update Review
exports.createProductReview = catchAsyncErrors(async (req, res, next) => {
  const { rating, comment, productId } = req.body;
  const review = {
    user: req.user._id,
    name: req.user.name,
    avatar: req.user.avatar.url,
    rating: Number(rating),
    comment,
  };
  const product = await Product.findById(productId);

  const isReviewed = product.reviews.find(
    (rev) => rev.user.toString() === req.user._id.toString()
  );
  if (isReviewed) {
    product.reviews.forEach((rev) => {
      if (rev.user.toString() === req.user._id.toString()) {
        (rev.rating = rating), (rev.comment = comment);
      }
    });
  } else {
    product.reviews.push(review);
    product.numberOfReviews = product.reviews.length;
  }
  let toalReviewPoints = 0;
  product.reviews.forEach((rev) => {
    toalReviewPoints += rev.rating;
  });
  product.ratings = toalReviewPoints / product.reviews.length;

  await product.save({ validateBeforeSave: false });
  res.status(200).json({
    success: true,
  });
});

//Get All Reviews of a product
exports.getProductReviews = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.query.productId);

  if (!product) {
    return next(new ErrorHandler("Product Not Found", 404));
  }
  const numberOfReviews = product.reviews.length;
  res.status(200).json({
    success: true,
    numberOfReviews,
    reviews: product.reviews,
  });
});

// Delete Review
const mongoose = require('mongoose');
const getDataUri = require("../utils/dataUri");
exports.deleteProductReviews = catchAsyncErrors(async (req, res, next) => {
  const productId = req.query.productId;
  const reviewId = req.query.id;
  if (!mongoose.Types.ObjectId.isValid(productId)) {
    return next(new ErrorHandler('Invalid Product ID', 400));
  }
  if (!mongoose.Types.ObjectId.isValid(reviewId)) {
    return next(new ErrorHandler('Invalid Review ID', 400));
  }
  const product = await Product.findById(productId);
  if (!product) {
    return next(new ErrorHandler('Product Not Found', 404));
  }
  const reviews = product.reviews.filter((rev) => rev._id.toString() !== reviewId.toString());
  let totalReviewPoints = 0;
  reviews.forEach((rev) => {
    totalReviewPoints += rev.rating;
  });
  const ratings = reviews.length > 0 ? totalReviewPoints / reviews.length : 0;
  const numberOfReviews = reviews.length;
  const updatedProduct = await Product.findByIdAndUpdate(
    productId,
    {
      reviews,
      ratings,
      numberOfReviews,
    },
    {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    }
  );
  if (!updatedProduct) {
    return next(new ErrorHandler('Error updating product', 500));
  }
  res.status(200).json({
    success: true,
  });
});
