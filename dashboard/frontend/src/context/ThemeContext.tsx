import {
    createContext,
    useContext,
    useState
} from "react"

interface ThemeContextType {

    darkMode: boolean

    toggleTheme: () => void
}

const ThemeContext =
    createContext<
        ThemeContextType | undefined
    >(undefined)

export function ThemeProvider({
    children
}: {
    children: React.ReactNode
}) {

    const [darkMode, setDarkMode] =
        useState(false)

    const toggleTheme = () => {

        setDarkMode((prev) => !prev)
    }

    return (

        <ThemeContext.Provider
            value={{
                darkMode,
                toggleTheme
            }}
        >

            {children}

        </ThemeContext.Provider>
    )
}

export function useTheme() {

    const context =
        useContext(ThemeContext)

    if (!context) {

        throw new Error(
            "useTheme must be used inside ThemeProvider"
        )
    }

    return context
}