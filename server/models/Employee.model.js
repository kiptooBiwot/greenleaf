const { Schema, model } = require("mongoose");
const bcrypt = require('bcrypt')

const employeeSchema = new Schema(
  {
    first_name: { type: String, required: false, trim: true },
    middle_name: { type: String, required: false, trim: true },
    last_name: { type: String, required: false, trim: true },
    id_number: { type: Number, required: false, trim: true },
    // email: {
    //   type: String,
    //   required: true,
    //   unique: true,
    // },
    role: {
      type: String,
      default: "user",
      enum: ["user", "admin", "superadmin"],
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    daily_pickings: [
      {
        type: Schema.Types.ObjectId,
        ref: "Pickings",
      },
    ],
    nhif_number: { type: String, required: false, trim: true },
    nssf_number: { type: String, required: false, trim: true },
    dob: { type: Date, required: false, trim: true },
    mobile_number: { type: Number, required: false, trim: true },
    address: { type: String, required: false, trim: true },
  },
  { timestamps: true }
);

employeeSchema.pre('save', async function (next) {
  try {
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(this.password, salt)
    this.password = hashedPassword
  } catch (error) {
    next(error)
  }
})

module.exports = model("Employee", employeeSchema);
