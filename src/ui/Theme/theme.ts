export const theme = {
  spacing: {
    default: '20px',
    buttonPadding: '10px 15px',
    inputPadding: '10px 15px',
    contentPadding: '20px',
    formGroupMargin: '20px',
    labelMargin: '5px',
    paragraphMargin: '10px 0',
  },
  fontSize: {
    base: '1.4rem',
    button: '1.2rem',
    // TODO: heading
  },
  color: {
    primary: 'rgb(0, 118, 255);',
    neutral0: 'hsl(0, 0%, 100%)',
    neutral5: 'hsl(0, 0%, 95%)',
    neutral10: 'hsl(0, 0%, 90%)',
    neutral20: 'hsl(0, 0%, 80%)',
    neutral30: 'hsl(0, 0%, 70%)',
    neutral40: 'hsl(0, 0%, 60%)',
    neutral50: 'hsl(0, 0%, 50%)',
    neutral60: 'hsl(0, 0%, 40%)',
    neutral70: 'hsl(0, 0%, 30%)',
    neutral80: 'hsl(0, 0%, 20%)',
    neutral90: 'hsl(0, 0%, 10%)',
  },
}

export type ThemeDefinition = typeof theme
