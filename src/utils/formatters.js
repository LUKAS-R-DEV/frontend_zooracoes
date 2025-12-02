export const formatters = {
  date: (dateString) => {
    if (!dateString) return '-'
    try {
      // Garante que a data seja interpretada corretamente
      const date = new Date(dateString)
      if (isNaN(date.getTime())) return '-'
      return date.toLocaleDateString('pt-BR', { timeZone: 'America/Sao_Paulo' })
    } catch (error) {
      console.error('Erro ao formatar data:', error)
      return '-'
    }
  },

  dateTime: (dateString) => {
    if (!dateString) return '-'
    try {
      // Garante que a data seja interpretada corretamente com timezone
      const date = new Date(dateString)
      if (isNaN(date.getTime())) return '-'
      return date.toLocaleString('pt-BR', { 
        timeZone: 'America/Sao_Paulo',
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
    } catch (error) {
      console.error('Erro ao formatar data/hora:', error)
      return '-'
    }
  },

  currency: (value) => {
    if (!value) return 'R$ 0,00'
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value)
  },

  phone: (phone) => {
    if (!phone) return '-'
    return phone.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3')
  }
}






