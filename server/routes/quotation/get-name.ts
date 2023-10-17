import { prisma } from "~~/prisma/db";

export default defineEventHandler(async (event) => {
  const { selectedSeries } = await readBody(event);
  const response = {};

  try {
    const lastRecord = await prisma.invoice.findFirst({
      orderBy: { created_at: 'desc' },
    });

    let sequence = 1;
    console.log("My last record is ", lastRecord);
    if (lastRecord && lastRecord.name) {
      const lastSequenceMatch = lastRecord.name.match(/(\d+)$/);
      if (lastSequenceMatch) {
        const lastSequence = parseInt(lastSequenceMatch[1]);
        if (!isNaN(lastSequence)) {
          sequence = lastSequence + 1;
        }
      }
    }

    const paddedSequence = sequence.toString().padStart(3, '0');
    const newName = `${selectedSeries}${paddedSequence}`;

    response['name'] = newName;
    response['success'] = true;
  } catch (error) {
    response['success'] = false;
    response['message'] = error.toString();
  }

  return response;
});