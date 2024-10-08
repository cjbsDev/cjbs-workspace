/** @type {import('tailwindcss').Config} */
// console.log("✅✅Tailwind App Config",__dirname)
module.exports = {
    // prefix: '',
    // important: true,
    content: [
      // "./**/*.{ts,tsx,js,jsx}"
      './src/app/**/*.{ts,tsx,js,jsx,html}',
      '../../packages/cjbsDSTM/atoms/**/*.{ts,tsx,js,jsx,html}'
      // './public/**/*.{html,js,tsx}'
      // "apps/bsadmin/src/**/*.{ts,tsx,js,jsx}"
      // "./atoms/**/*.{ts,tsx,js,jsx}",
    //   "../../packages/cjbsDSTM/**/*.{ts,tsx,js,jsx}",
    ],
    theme: {
      fontSize: {
        xs: ["0.75rem","1rem"],
        sm: ["0.875rem","1rem"],
        base: ["1rem","1.25rem"],
        lg: ["1.125rem", "1.75rem"],
        xl: ["1.25rem", "1.75rem"],
        "2xl": ["1.5rem", "2rem"],
            "3xl": ["1.875rem", "2.25rem"],
            "4xl": ["2.25rem", "2.5rem"],
            "5xl": ["3rem", "1"],
            "6xl": ["3.75rem", "1"],
      },
        container: {
          center: true,
          padding: "2rem",
          screens: {
            "2xl": "1400px",
          },
        },
        screens: {
          /*
           * True 4K
           */
          "4xl": {min: "3840px"},
    
          /*
           * WQHD
           */
          "3xl": {max: "3839px", min: "2560px"},
          "3xlm": {max: "3839px"},
    
          /*
           * QHD + FHD
           */
          "2xl": {max: "2559px", min: "1920px"},
          "2xlm": {max: "2559px"},
    
          /*
           * HD
           */
          xl: {max: "1919px", min: "1280px"},
          xlm: {max: "1919px"},
          lg: {max: "1279px", min: "1024px"},
          lgm: {max: "1279px"},
    
          /*
           * Tablet + Mobile
           */
          md: {max: "1023px", min: "768px"},
          mdm: {max: "1023px"},
          sm: {max: "767px", min: "568px"},
          smm: {max: "767px"},
          mobile: {max: "567px"},
        },
        extend: {
        fontSize: {
        short: ["0.8rem","1rem"],
        tall: ["0.9rem","1rem"],
        },
          colors: {
            "cj-red": "#ef151e",
            "cj-healthy": "#ef151e",
            "cj-yellow": "#ff9700",
            "cj-happy": "#ff9700",
            "cj-blue": "#006ecd",
            "cj-convenient": "#006ecd",
            "cj-gray": "#97999b",
            "ancestral-green": "#3ac1bc",
            "ancestral-blue": "#33a3bd",
            "taxonomic-rank-domain": "#ef151e",
            "taxonomic-rank-phylum": "#ff7300",
            "taxonomic-rank-class": "#ff9700",
            "taxonomic-rank-order": "#00cd4f",
            "taxonomic-rank-family": "#00bfcd",
            "taxonomic-rank-genus": "#006ecd",
            "taxonomic-rank-species": "#191875",
            "taxonomic-rank-subspecies": "dimgrey",
    
            border: "hsl(var(--border))",
            input: "hsl(var(--input))",
            ring: "hsl(var(--ring))",
            background: "hsl(var(--background))",
            foreground: "hsl(var(--foreground))",
            primary: {
              DEFAULT: "hsl(var(--primary))",
              foreground: "hsl(var(--primary-foreground))",
            },
            secondary: {
              DEFAULT: "hsl(var(--secondary))",
              foreground: "hsl(var(--secondary-foreground))",
            },
            destructive: {
              DEFAULT: "hsl(var(--destructive))",
              foreground: "hsl(var(--destructive-foreground))",
            },
            muted: {
              DEFAULT: "hsl(var(--muted))",
              foreground: "hsl(var(--muted-foreground))",
            },
            accent: {
              DEFAULT: "hsl(var(--accent))",
              foreground: "hsl(var(--accent-foreground))",
            },
            popover: {
              DEFAULT: "hsl(var(--popover))",
              foreground: "hsl(var(--popover-foreground))",
            },
            card: {
              DEFAULT: "hsl(var(--card))",
              foreground: "hsl(var(--card-foreground))",
            },
    
            taxo: {
              d: "#EF151E",
              p: "#FF7300",
              c: "#FF9700",
              o: "#00CD4F",
              f: "#00BFCD",
              g: "#006ECD",
              s: "#8e7cc3",
            },
    
            /*
             * Actual Theme Colours in Use
             */
            theme: {
              bg: "var(--theme-background)",
            //   box: "var(--theme-container)",
          box: "rgba(var(--theme-container),<alpha-value>)",
              scroll: "var(--theme-scroll)",
              text: "var(--theme-text)",
              "text-hover": "var(--theme-text-hover)",
              "text-contrast": "var(--theme-text-contrast)",
              subtext: "var(--theme-subtext)",
              "subtext-hover": "var(--theme-subtext-hover)",
              "subtext-contrast": "var(--theme-subtext-contrast)",
              border: "var(--theme-border)",
              link: "var(--theme-link)",
              footer: "var(--theme-footer)",
              primary: {
                // DEFAULT: "var(--theme-primary)",
                DEFAULT: "rgba(var(--theme-primary),<alpha-value>)",
                hover: "var(--theme-primary-hover)",
          bg:"var(--theme-primary-bg)"
              },
              secondary: {
                DEFAULT: "var(--theme-secondary)",
                hover: "var(--theme-secondary-hover)",
          bg:"var(--theme-secondary-bg)"
              },
              // success: "#198038",
              success: {
                DEFAULT: "var(--theme-success)",
                hover: "var(--theme-success-hover)",
          bg: "var(--theme-success-bg)"
              },
              warning: {
                // mild: "#f1c21b",
                DEFAULT: "rgba(var(--theme-warning),<alpha-value>)",
          mild: "rgba(var(--theme-warning-mild),<alpha-value>)",
                hover: "var(--theme-warning-hover)",
          bg: "var(--theme-warning-bg)"
              },
              // danger: "#da1e28"
              danger: {
                DEFAULT: "var(--theme-danger)",
                hover: "var(--theme-danger-hover)",
          bg: "var(--theme-danger-bg)"
              },
              grey: {
                DEFAULT: "var(--theme-grey)",
                hover: "var(--theme-grey-hover)",
          bg: "var(--theme-grey-bg)"
              },
              transparent: {
                DEFAULT: "transparent",
                hover: "var(--theme-transparent-hover)",
              },
          perma: {
          bg: {
            DEFAULT: "var(--theme-perma-bg)",
            hover: "var(--theme-perma-bg-hover)"
          },
          grey: {
            DEFAULT: "var(--theme-perma-grey)"
          }
          },
          tabs: {
          bg: "var(--theme-tabs-bg)"
          }
            },
          },
          borderRadius: {
            lg: `var(--radius)`,
            md: `calc(var(--radius) - 2px)`,
            sm: "calc(var(--radius) - 4px)",
          },
          // fontFamily: {
          //   sans: ["var(--font-sans)", ...fontFamily.sans],
          //   manrope: ["var(--font-manrope)"],
          //   cj: ["var(--font-cj)"],
          // },
          keyframes: {
            "accordion-down": {
              from: {height: "0"},
              to: {height: "var(--radix-accordion-content-height)"},
            },
            "accordion-up": {
              from: {height: "var(--radix-accordion-content-height)"},
              to: {height: "0"},
            },
            "text-flash": {
              "0%, 100%": {opacity: 1},
              "50%": {opacity: 0},
            },
            // "helix-spinner-before": {
            // 	"0%": {
            // 		top: "var($dot)*-var($h)",
            // 		"z-index": 1
            // 	},
            // 	"25%": {
            // 		transform: "scale(1.2)",
            // 		"z-index": 1
            // 	},
            // 	"50%": {
            // 		top: "var($dot)*var($h)",
            // 		"z-index": -1
            // 	},
            // 	"75%": {
            // 		"background-color": "nth(var($c2),1)",
            // 		transform: "scale(0.8)",
            // 		"z-index": -1
            // 	},
            // 	"100%": {
            // 		"z-index": -1
            // 	}
            // },
            // "helix-spinner-after": {
            // 	"0%": {
            // 		top: "var($dot)*var($h)",
            // 		"z-index": -1
            // 	},
            // 	"25%": {
            // 		"background-color": "nth(var($c2),2)",
            // 		transform: "scale(0.8)",
            // 		"z-index": -1
            // 	},
            // 	"50%": {
            // 		top: "var($dot)*-var($h)",
            // 		"z-index": 1
            // 	},
            // 	"75%": {
            // 		transform: "scale(1.2)",
            // 		"z-index": 1
            // 	},
            // 	"100%": {
            // 		"z-index": 1
            // 	}
            // },
            // "helix-spinner-before-colour": {
            // 	"75%": {
            // 		"background-color": "nth(var($c2),1)"
            // 	}
            // },
            // "helix-spinner-after-colour": {
            // 	"75%": {
            // 		"background-color": "nth(var($c2),2)"
            // 	}
            // }
          },
          animation: {
            "accordion-down": "accordion-down 0.2s ease-out",
            "accordion-up": "accordion-up 0.2s ease-out",
            "text-flash": "text-flash 2s cubic-bezier(0.42,0,0.58,1) infinite",
          },
        }
    },
    plugins: [],
  }
  
  