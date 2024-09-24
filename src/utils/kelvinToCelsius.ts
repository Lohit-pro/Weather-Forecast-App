export default function kelvinToCelsius(tempinkelvin: number) {
    const tempincelsius = tempinkelvin - 273.15;
    return Math.floor(tempincelsius);
}