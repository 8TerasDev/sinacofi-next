import React, { useContext } from 'react'
import DocumentScannerIcon from '@mui/icons-material/DocumentScanner';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import SupervisedUserCircleIcon from '@mui/icons-material/SupervisedUserCircle';
import styles from './sinadrawericons.module.css'
import { Tooltip, IconButton } from '@mui/material';
import { useTypeSearch } from '../../../custom-hooks/typeSearchHook';
import { TypeSearchContext } from '@/contexts/typesearch.context';


const SinaDrawerIcons = ({ isOpen, isActive = true }: any) => {
    const {
        typeOfSearch,
        onSelectFolioType,
        onSelectRutType,
        onSelectBeneficiarioType,
        activeColorFolio,
        activeColorRut,
        activeColorBeneficiario,
        TypeOfSearch
    } = useContext(TypeSearchContext)

    const activeIconBorder = isOpen ? styles.active_icon_open : styles.active_icon_close
    const styleIconContainer = isOpen ? styles.icons_open : styles.icons_close
    const styleFolioContainer = TypeOfSearch.FOLIO === typeOfSearch ? activeIconBorder : ''
    const styleRutContainer = TypeOfSearch.RUT === typeOfSearch ? activeIconBorder : ''
    const styleBeneficiarioContainer = TypeOfSearch.BENEFICIARIO === typeOfSearch ? activeIconBorder : ''


    return (
        <div className={styleIconContainer}>
            <div className={`${styleFolioContainer} ${styles.icons_container}`}>
                <Tooltip title="Búsqueda por declaración">
                    <IconButton onClick={() => { onSelectFolioType() }}>
                        <DocumentScannerIcon color={activeColorFolio} />
                    </IconButton>
                </Tooltip>
            </div>
            <div className={`${styleRutContainer} ${styles.icons_container}`}>
                <Tooltip title="Búsqueda por persona jurídica">
                    <IconButton onClick={() => { onSelectRutType() }}>
                        <BusinessCenterIcon color={activeColorRut} />
                    </IconButton>
                </Tooltip>
            </div>
            <div className={`${styleBeneficiarioContainer} ${styles.icons_container}`}>
                <Tooltip title="Búsqueda por beneficiario final o control efectivo">
                    <IconButton onClick={() => { onSelectBeneficiarioType() }}>
                        <SupervisedUserCircleIcon color={activeColorBeneficiario} />
                    </IconButton>
                </Tooltip>
            </div>
        </div>
    )
}

export default SinaDrawerIcons