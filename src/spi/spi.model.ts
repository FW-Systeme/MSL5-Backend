export interface SPI_MESSAGE {
  "Type": string;
  "Device": {
    "Bus": number;
    "Chip": number;
  }
  "Entries": {
    "Number": number;
    "AnalogValue": number;
    "Factor": number;
    "Value": number;
    "LowerBound": number;
    "UpperBound": number;
    "Unit": string;
    "Type": SPI_TYPE;
    "IsLogging": boolean;
  }[]
}

export type SPI_TYPE = "0-10V" | "0.4-2V" | "0-20mA" | "4-20mA";