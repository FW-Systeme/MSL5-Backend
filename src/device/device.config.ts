import { registerAs } from "@nestjs/config";
import { Device } from "./device.entity";

export default registerAs('device', (): Device => {
  return {
    city: "Oldeburch",
    description: "MSL5 Test Gerät",
    createdAt: new Date(),
    isActive: true,
    manufacturer: "FW-Systeme",
    name: "MSL5Test",
    object: "",
    period: 60,
    postalcode: "26133",
    street: "Steinkamp 22"
  }
})