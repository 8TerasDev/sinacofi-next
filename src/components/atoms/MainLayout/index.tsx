
import styles from './mainlayout.module.css'
export const MainLayout = ({ children }: { children?: React.ReactNode }) => {
    return (
        <div className={styles.container}>{children && children}</div>
    )
}