import SHA256 from "crypto-js/sha256";
import platform from "platform";

export function getDeviceId() {
    
    const data = [
        platform.os.toString(),
        platform.name + platform.version,
        platform.product || "Unknown",
        platform.layout,
        platform.description,
    ].join("||");

    return SHA256(data).toString();
    
}
