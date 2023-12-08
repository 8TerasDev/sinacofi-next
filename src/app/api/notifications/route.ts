export const dynamic = 'force-dynamic'
import { NextRequest } from "next/server";
import {
  disablePJuridicas,
  getAllPJuridicas,
  getAllPJuridicasByDates,
} from "@/lib/pjuridica.prisma";
import { BfDataProcessFilelog, PJuridicas } from "@/application";
import { getSessionUser } from "@/lib/security";
import { processError } from "@/lib/error";
import { getAllFileLog } from "@/lib/bf_data_process_filelog.prisma";


function convertirFecha(fechaOriginal: string): string {
  const partes = fechaOriginal.split("-");
  return `${partes[2]}-${partes[1]}-${partes[0]}`;
}

function clearFileLog(bfDataProcessFilelog: BfDataProcessFilelog[]) {
  return bfDataProcessFilelog.map(log => {
    const fecha_creacion = String(log.created_at?.toISOString() || "").slice(0, 10)
    const fecha = convertirFecha(fecha_creacion)
    return {
      ...log,
      id: Number(log.id),
      created_at: fecha,
    }
  })
}

export async function GET(req: NextRequest) {
  try {
    const url = req.nextUrl;
    const bank_id = url.searchParams.get("bank_id");
    if (bank_id) {
      const logs = await getAllFileLog(bank_id)
      const cleanLogs = clearFileLog(logs)
      return Response.json({ logs: cleanLogs });
    }
    const logs = await getAllFileLog()
    const cleanLogs = clearFileLog(logs)
    return Response.json({ logs: cleanLogs });
  } catch (error) {
    console.log(error)
    return new Response(JSON.stringify({ error }), {
      status: 500,
    });
  }
}

export async function POST(req: NextRequest) {
  try {
    getSessionUser(req)
    const body = await req.json();
    const { id } = body;
    const actualizadas = await disablePJuridicas(id);
    return Response.json({ actualizadas });
  } catch (error) {
    return processError(error)
  }
}
