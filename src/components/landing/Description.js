import React from "react";

const link = "https://docs.google.com/forms/d/e/1FAIpQLSdoE9NXcQaVn7LNaiZVB0I-lxkU1FXMgqhxJMRh9eyhrCM3Gw/viewform?vc=0&c=0&w=1&flr=0&usp=mail_form_link";

const Description = () => {
  return (
    <div className="mt-80 flex flex-col items-center justify-center">
      <h1 className="text-center text-slate-900 text-xl font-semibold">
        Hello, we are currently conducting a closed beta testing phase, during
        which access is granted exclusively to users who have joined our{" "}
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 hover:underline"
        >
          waitlist.
        </a>
      </h1>
      <h1 className="text-center mt-8 text-slate-900 text-xl font-semibold">
        To find out how KaizenFlo can improve your BJJ and to join our waitlist,
        please{" "}
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 hover:underline"
        >
          click here
        </a>
        . Alternatively, you can also contact us via email at
        kaizenflotech@gmail.com
      </h1>
      <h2 className="text-center mt-8 text-slate-500 text-lg pt-2">
        KaizenFlo - For Grapplers By Grapplers.
      </h2>
    </div>
  );
};

export default Description;
