const Booking = require('../models/bookingModels');
const Tour = require('../models/tourModels');
const User = require('../models/userModels');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

exports.getOverview = catchAsync(async (req, res, next) => {
  const tours = await Tour.find();
  // console.log(tours);
  res.status(200).render('overview', {
    title: 'All Tours',
    tours,
  });
});

exports.getTour = catchAsync(async (req, res, next) => {
  const tour = await Tour.findOne({ slug: req.params.slug }).populate({
    path: 'reviews',
    fields: 'review rating user',
  });
  if (!tour) return next(new AppError('There is no tour with the name', 404));
  res.status(200).render('tour', {
    title: `${tour.name} Tour`,
    tour,
  });
});

exports.getLoginForm = (req, res) => {
  res.status(200).render('login', {
    title: `log into your account`,
  });
};
exports.getAccount = (req, res) => {
  res.status(200).render('account', {
    title: `your account`,
  });
};

exports.getMyTours = catchAsync(async (req, res, next) => {
  console.log('My get tours');
  const bookings = await Booking.find({ user: req.user.id });
  console.log('My get mid tours');
  const tourIds = bookings.map((el) => el.tour);
  console.log('My get beforeend tours');
  const tours = await Tour.find({ _id: { $in: tourIds } });
  console.log('My get end tours');

  res.status(200).render('overview', {
    title: 'My tours',
    tours,
  });
});

exports.updateUserData = catchAsync(async (req, res, next) => {
  const updateUser = await User.findByIdAndUpdate(
    req.user.id,
    {
      name: req.body.name,
      email: req.body.email,
    },
    {
      new: true,
      runValidators: true,
    }
  );

  res.status(200).render('account', {
    title: 'your account',
    user: updateUser,
  });
});
