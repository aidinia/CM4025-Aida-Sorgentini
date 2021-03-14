import { createMuiTheme } from '@material-ui/core/styles'
import { pink } from '@material-ui/core/colors'
const theme = createMuiTheme({
 typography: {
    useNextVariants: true,
 },
 palette: {
    primary: {
        light: '#5c67a3',
        main: '#d5f494',
        dark: '#77BB93',
        contrastText: '#5F6553',
        
    },
    secondary: {
        light: '#77BB93',
        main: '#ff4081',
        dark: '#c60055',
        contrastText: '#000',
    },
    openTitle: '#354c07',
    protectedTitle: '#bfacb5',
    type: 'light'
    }
 })
 export default theme