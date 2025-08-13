"use client";
import { ClientJS } from "clientjs";
import { useEffect } from "react";
import platform from "platform";

const UserIndexPage = () => {
  const client = new ClientJS();
  const fingerprint = client.getFingerprint();


  console.log(client.getDevice());
  console.log(client.getDeviceVendor());

  console.log("Fingerprint:", fingerprint);

  useEffect(() => {
    const data = {
      os: platform.os.toString(),
      browser: platform.name + " " + platform.version,
      device: platform.product || "Unknown",
      layout: platform.layout,
      description: platform.description,
    };
    console.log(platform)
    console.log(data);
  }, []);

  return <>{/* <p>Your fingerprint: {fingerprint}</p> */}</>;
};

export default UserIndexPage;
