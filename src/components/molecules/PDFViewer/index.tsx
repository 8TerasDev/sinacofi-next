"use client"
import React from 'react';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';
import { PJuridicas } from '@/application';
const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    flex: 1,
    padding: '20px 50px',
    width: '100%',
  },
})
const stylesTable = StyleSheet.create({
  tableContainer: {
    flexDirection: 'column',
    fontWeight: 'bold',
    borderWidth: '1px',
    borderColor: 'grey',
    marginTop: '20px',
    marginBottom: '20px'
  },
  tableRow: {
    flexDirection: 'column',
    paddingTop: '4px',
    paddingBottom: '4px',
    borderBottomWidth: '1px',
    borderColor: 'grey',
  },
  tableTitle: {
    width: '100%',
    alignItems: 'center',
    padding: '20px',
    backgroundColor: 'rgba(0, 179, 226, 0.1)'
  },
  tableBody: {
    width: '100%',
    padding: '20px'
  },
  tableColumnTitle: {
    fontSize: '12px',
    paddingBottom: '3px',
    fontWeight: 'bold'
  },
  tableColumn: {
    paddingRight: '10px',
    flexDirection: 'column',
    flex: 1,
  }
});
const stylesInfo = StyleSheet.create({
  container: {
    width: '100%',
    paddingTop: '20px',
    paddingBototm: '20px',
    flexWrap: 'wrap',
    flexDirection: 'row',
  },
  tableColumn: {
    width: '25%',
    padding: '10px'
  },
  tableColumnTitle: {
    fontSize: '12px',
    paddingBottom: '3px',
  },
})
type Props = {
  declaracion: PJuridicas,
  controlEfectivo: any,
  beneficiarios: any
}
export const PDFTableInfo = ({ declaracion }: { declaracion: PJuridicas }) => {
  const {
    rut_no: rut,
    domicilio,
    telefono,
    ciudad,
    lugar_de_constitucion: constitucion,
    nombre_rep_legal: nombreRep,
    tipo_sociedad: tipo,
    fechahora_creacion: fecha,
  } = declaracion || {};
  const rutRep = rut;
  return (
    <View style={stylesInfo.container}>
      <View style={stylesInfo.tableColumn}>
        <Text style={stylesInfo.tableColumnTitle}>
          RUT/N Identificación
        </Text>
        <Text style={{ fontSize: '10px' }}>
          {rut}
        </Text>
      </View>
      <View style={stylesInfo.tableColumn}>
        <Text style={stylesInfo.tableColumnTitle}>
          Domicilio
        </Text>
        <Text style={{ fontSize: '10px' }}>
          {domicilio}
        </Text>
      </View>
      <View style={stylesInfo.tableColumn}>
        <Text style={stylesInfo.tableColumnTitle}>
          Telefono
        </Text>
        <Text style={{ fontSize: '10px' }}>
          {telefono}
        </Text>
      </View>
      <View style={stylesInfo.tableColumn}>
        <Text style={stylesInfo.tableColumnTitle}>
          Ciudad
        </Text>
        <Text style={{ fontSize: '10px' }}>
          {ciudad}
        </Text>
      </View>
      <View style={stylesInfo.tableColumn}>
        <Text style={stylesInfo.tableColumnTitle}>
          Constitucion
        </Text>
        <Text style={{ fontSize: '10px' }}>
          {constitucion}
        </Text>
      </View>
      <View style={stylesInfo.tableColumn}>
        <Text style={stylesInfo.tableColumnTitle}>
          Nombre Rep. Legal
        </Text>
        <Text style={{ fontSize: '10px' }}>
          {nombreRep}
        </Text>
      </View>
      <View style={stylesInfo.tableColumn}>
        <Text style={stylesInfo.tableColumnTitle}>
          RUT Rep. Legal
        </Text>
        <Text style={{ fontSize: '10px' }}>
          {rutRep}
        </Text>
      </View>
      <View style={stylesInfo.tableColumn}>
        <Text style={stylesInfo.tableColumnTitle}>
          Tipo de Sociedad
        </Text>
        <Text style={{ fontSize: '10px' }}>
          {tipo}
        </Text>
      </View>
      <View style={stylesInfo.tableColumn}>
        <Text style={stylesInfo.tableColumnTitle}>
          Fecha de carga
        </Text>
        <Text style={{ fontSize: '10px' }}>
          {fecha && `${fecha}`}
        </Text>
      </View>
    </View>
  )
}
export const PDFTable = ({ title, registros }: any) => (
  <View style={stylesTable.tableContainer}>
    <View style={stylesTable.tableTitle}>
      <Text> {title} </Text>
    </View>
    <View style={stylesTable.tableBody}>
      {registros && registros.map((registro: any, index: any) => (
        <View key={index} style={stylesTable.tableRow}>
          <View style={{ flexDirection: 'row' }}>
            <View style={stylesTable.tableColumn}>
              <Text style={stylesTable.tableColumnTitle}>
                Nombre Completo
              </Text>
              <Text style={{ fontSize: '10px' }}>
                {registro.nombre_completo}
              </Text>
            </View>
            <View style={{ flexDirection: 'column', flex: 1 }}>
              <Text style={stylesTable.tableColumnTitle}>
                RUT / Identificación
              </Text>
              <Text style={{ fontSize: '10px' }}>
                {registro.cni_id_rut_benef_final}
              </Text>
            </View>
            <View style={{ flexDirection: 'column', flex: 1 }}>
              <Text style={stylesTable.tableColumnTitle}>
                Participación
              </Text>
              <Text style={{ fontSize: '10px' }}>
                {registro.porc_participacion}
              </Text>
            </View>
          </View>
        </View>
      ))}
    </View>
  </View>
)
export const DeclaracionPDF = ({
  declaracion,
  controlEfectivo,
  beneficiarios,
}: Props) => {
  return (
    <Document>
      <Page size="LETTER" style={styles.page}>
        <View style={{ width: '100%', padding: '20px', justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ fontSize: '30px', textAlign: 'center' }}> DECLARACIONES </Text>
        </View>
        <PDFTableInfo declaracion={declaracion} />
        <PDFTable title="Beneficiarios Finales" registros={beneficiarios} />
        <PDFTable title="Control Efectivo" registros={controlEfectivo} />
      </Page>
    </Document>
  )
}