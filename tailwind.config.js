module.exports = {
  theme: {
    extend: {
      colors: {
        "custom-blue": "#162855"
      },
      spacing: {
        "90": "90%",
        "70": "70%"
      },
      height: {
        half: "50%",
        "30": "30%",
        "2-7": "2.7px",
        "3px": "3px",
        "view-height-forced": "95vh !important",
        "70": "70%",
        "20": "20%",
        "25": "25%"
      },
      transitionProperty: {
        " height": "height"
      },
      flex: {
        "3": "3 3 0%"
      },
      screens: {
        xs: { max: "639px" }
      },
      inset: {
        "20": "20%",
        "40": "40%",
        "50": "50%"
      }
    }
  },
  variants: {
    backgroundColor: ["responsive", "focus", "hover", "active"],
    height: ["responsive", "hover", "focus"]
  },
  plugins: []
};
