import React from "react";

interface ICustomTooltip {
  active?: boolean;
  payload?: any;
  label?: any;
}

const CustomTooltip: React.FC<ICustomTooltip> = ({
  active,
  payload,
  label,
}) => {
  console.log(payload, label, "oke");

  if (active && payload && payload.length) {
    return (
      <div
        style={{
          boxShadow: "10px 10px 20px 0px rgba(0, 0, 0, 0.30)",
        }}
        className="bg-[#282E44] text-white p-5 flex flex-col"
      >
        <p
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "flex-start",
          }}
        >{`${label}`}</p>
        <div>
          {payload.map(
            (pld: {
              dataKey: string;
              value:
                | string
                | number
                | boolean
                | React.ReactElement<
                    any,
                    string | React.JSXElementConstructor<any>
                  >
                | React.ReactFragment
                | React.ReactPortal
                | null
                | undefined;
            }) => (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <div
                  style={{
                    width: 11,
                    height: 11,
                    borderRadius: "50%",
                    backgroundColor:
                      pld.dataKey !== "twitterFollow" ? "#24B592" : "#E25148",
                  }}
                ></div>
                <div>
                  <p
                    style={{
                      color: "#A1A1AA",
                      fontSize: 12,
                      marginLeft: 4,
                    }}
                  >
                    {pld.dataKey !== "twitterFollow"
                      ? "Trend Score:"
                      : "Trend Score:"}
                    <br />
                    <span style={{ marginLeft: 5, color: "#FFF" }}>
                      {pld.value}
                    </span>
                  </p>
                </div>
              </div>
            )
          )}
        </div>
      </div>
    );
  }

  return null;
};

export default React.memo(CustomTooltip);
