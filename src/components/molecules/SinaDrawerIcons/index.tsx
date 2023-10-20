import React from 'react'
import DocumentScannerIcon from '@mui/icons-material/DocumentScanner';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import styles from './sinadrawericons.module.css'
import { Tooltip, IconButton } from '@mui/material';
import { useTypeSearch } from '../../../custom-hooks/typeSearchHook';


const SinaDrawerIcons = ({ isOpen, isActive = true }: any) => {
    const { typeOfSearch, onSelectFolioType, onSelectRutType, activeColorFolio, activeColorRut, TypeOfSearch } = useTypeSearch()

    const activeIconBorder = isOpen ? styles.active_icon_open : styles.active_icon_close
    const styleIconContainer = isOpen ? styles.icons_open : styles.icons_close
    const styleFolioContainer = TypeOfSearch.FOLIO === typeOfSearch ? activeIconBorder : ''
    const styleRutContainer = TypeOfSearch.RUT === typeOfSearch ? activeIconBorder : ''


    return (
        <div className={styleIconContainer}>
            <div className={`${styleFolioContainer} ${styles.icons_container}`}>
                <Tooltip title="Búsqueda por declaración">
                    <IconButton onClick={onSelectFolioType}>
                        <DocumentScannerIcon color={activeColorFolio} />
                    </IconButton>
                </Tooltip>
            </div>
            <div className={`${styleRutContainer} ${styles.icons_container}`}>
                <Tooltip title="Búsqueda por persona jurídica">
                    <IconButton onClick={onSelectRutType}>
                        <BusinessCenterIcon color={activeColorRut} />
                    </IconButton>
                </Tooltip>
            </div>
        </div>
    )
}

export default SinaDrawerIcons