document.addEventListener("DOMContentLoaded", () => {
  const hoje = new Date();
  document.getElementById('data_hoje').value = hoje.toLocaleDateString('pt-BR');
  document.getElementById('hora').value = hoje.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });

  document.getElementById('sbar-form').addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const campos = Object.fromEntries(formData.entries());

    const existingPdfBytes = await fetch('modelo.pdf').then(res => res.arrayBuffer());
    const pdfDoc = await PDFLib.PDFDocument.load(existingPdfBytes);
    const form = pdfDoc.getForm();

    form.getTextField('#NOME COMPLETO#').setText(campos.nome_completo);
    form.getTextField('#DN#').setText(campos.data_nascimento);
    form.getTextField('#DIA_HJ#').setText(campos.data_hoje);
    form.getTextField('#HR#').setText(campos.hora);
    form.getTextField('#UNIDADE_ORIGEM#').setText(campos.unidade_origem);
    form.getTextField('#UNIDADE_DESTINO#').setText(campos.unidade_destino);
    form.getTextField('#MOTIVO_TRANSFERENCIA#').setText(campos.motivo_transferencia);
    form.getTextField('#DIAGNOSTICO#').setText(campos.diagnostico);
    form.getTextField('#MEDICAMENTOS#').setText(campos.medicamentos);
    form.getTextField('#SP#').setText(campos.spo2);
    form.getTextField('#PA#').setText(campos.pa);
    form.getTextField('#FC#').setText(campos.fc);
    form.getTextField('#FR#').setText(campos.fr);
    form.getTextField('#TAX#').setText(campos.tax);
    form.getTextField('#DOR#').setText(campos.dor);
    form.getTextField('#AVALIACAO#').setText(campos.avaliacao);
    form.getTextField('#RECOMENDACOES#').setText(campos.recomendacoes);

    const pdfBytes = await pdfDoc.save();
    const blob = new Blob([pdfBytes], { type: "application/pdf" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "sbar_preenchido.pdf";
    link.click();
  });
});