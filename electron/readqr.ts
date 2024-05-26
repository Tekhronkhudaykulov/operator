// import * as usb from "usb";
// @ts-ignore
import * as HID from "node-hid";

// Interfeys yaratish
interface ScannerDevice {
  vendorId: number;
  productId: number;
  manufacturer?: string;
  product?: string;
  path: string;
}

// Replace with your scanner's VID and PID
const VENDOR_ID: number = 1317;
const PRODUCT_ID: number = 42152;

// Get the list of connected USB devices

// const devicesUSB = usb.getDeviceList();

// console.log("Connected USB devices:");

// devicesUSB.forEach((device) => {
//   console.log("Manufacturer:", device.deviceDescriptor.iManufacturer);
//   console.log("Product:", device.deviceDescriptor.iProduct);
//   console.log("Serial Number:", device.deviceDescriptor.iSerialNumber);
//   console.log("Vendor ID:", device.deviceDescriptor.idVendor);
//   console.log("Product ID:", device.deviceDescriptor.idProduct);
//   console.log(
//     "----------------------------------------------------------------"
//   );
// });


// Find the scanner device
function connectQRcodeDevice(): string | Error {
  const devices: HID.Device[] = HID.devices();
  const scanner: ScannerDevice | undefined = devices.find(
    (device) => device.vendorId === VENDOR_ID && device.productId === PRODUCT_ID
  );

  if (scanner) {
    console.log("Scanner found:", scanner.manufacturer, scanner.product);
    return hideScanner(scanner);
  } else {
    console.log("Scanner not found");
    return "Scanner not found";
  }
}

function hideScanner(scanner: ScannerDevice): any {
  // Create a new HID device instance
  const device = new HID.HID(scanner.path);

  // Listen for data events
  device.on("data", (data: Buffer) => {
    const scannedData = data.toString("utf8");
    return scannedData;
    // console.log("Scanned data:", scannedData);
    // Process the scanned data as needed
  });

  // Handle device errors
  device.on("error", (error: Error) => {
    return error;
    // console.error("Scanner error:", error);
  });
}

export default connectQRcodeDevice;
