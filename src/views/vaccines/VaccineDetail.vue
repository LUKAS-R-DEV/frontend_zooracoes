<template>
  <AppLayout>
    <div class="page-header">
      <div>
        <Button variant="secondary" icon="arrow-left" @click="handleBack">
          Voltar
        </Button>
        <h1 class="page-title">Detalhes da Vacina</h1>
      </div>
    </div>

    <Card v-if="loading">
      <Loading />
    </Card>

    <Card v-else-if="error" class="error-card">
      <div class="error-message" style="display: flex; align-items: center; gap: 8px">
        <Icon name="alert-circle" :size="20" />
        {{ error }}
      </div>
    </Card>

    <div v-else-if="vaccine" class="detail-container">
      <Card>
        <div class="detail-section">
          <h2 class="section-title">Informações da Vacina</h2>
          <div class="detail-grid">
            <div class="detail-item">
              <div class="detail-label">
                <Icon name="syringe" :size="18" />
                <span>Nome da Vacina</span>
              </div>
              <div class="detail-value">{{ vaccine.vaccineName || '-' }}</div>
            </div>

            <div class="detail-item">
              <div class="detail-label">
                <Icon name="calendar" :size="18" />
                <span>Data de Aplicação</span>
              </div>
              <div class="detail-value">{{ formatDate(vaccine.appliedDate) }}</div>
            </div>

            <div class="detail-item">
              <div class="detail-label">
                <Icon name="calendar-days" :size="18" />
                <span>Próxima Dose</span>
              </div>
              <div class="detail-value">{{ vaccine.nextDoseDate ? formatDate(vaccine.nextDoseDate) : 'Não informada' }}</div>
            </div>

            <div class="detail-item detail-item-full" v-if="vaccine.notes">
              <div class="detail-label">
                <Icon name="file-text" :size="18" />
                <span>Observações</span>
              </div>
              <div class="detail-value">{{ vaccine.notes }}</div>
            </div>
          </div>
        </div>
      </Card>

      <Card>
        <div class="detail-section">
          <h2 class="section-title">Pet</h2>
          <div class="detail-grid">
            <div class="detail-item">
              <div class="detail-label">
                <Icon name="dog" :size="18" />
                <span>Nome do Pet</span>
              </div>
              <div class="detail-value">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  icon="external-link"
                  @click="$router.push(`/pets/${vaccine.petId}`)"
                >
                  {{ vaccine.petName || '-' }}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Card>

      <div class="actions-bar">
        <Button variant="secondary" icon="pencil" @click="handleEdit">
          Editar
        </Button>
      </div>
    </div>
  </AppLayout>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import AppLayout from '@/components/layout/AppLayout.vue'
import Card from '@/components/common/Card.vue'
import Button from '@/components/common/Button.vue'
import Icon from '@/components/common/Icon.vue'
import Loading from '@/components/common/Loading.vue'
import { useVaccines } from '@/composables/useVaccines'
import { formatters } from '@/utils/formatters'

const route = useRoute()
const router = useRouter()
const { vaccine, loading, error, fetchVaccine } = useVaccines()

const formatDate = (dateString) => {
  if (!dateString) return '-'
  return formatters.date(dateString)
}

const handleBack = () => {
  // Voltar para a página anterior ou para a lista de pets
  if (route.query.from === 'pet') {
    router.push(`/pets/${vaccine.value?.petId}`)
  } else {
    router.push('/pets')
  }
}

const handleEdit = () => {
  router.push(`/pets/${vaccine.value?.petId}?editVaccine=${vaccine.value?.id}`)
}

onMounted(async () => {
  await fetchVaccine(route.params.id)
})
</script>

<style scoped>
.page-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: var(--spacing-xl);
  gap: var(--spacing-md);
}

.page-header > div {
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
}

.page-title {
  font-size: 1.875rem;
  font-weight: 700;
  color: var(--color-gray-900);
  margin: 0;
}

.detail-container {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-lg);
}

.detail-section {
  width: 100%;
}

.section-title {
  font-size: 1.125rem;
  font-weight: 600;
  color: var(--color-gray-900);
  margin: 0 0 var(--spacing-lg) 0;
  padding-bottom: var(--spacing-md);
  border-bottom: 2px solid var(--color-gray-100);
}

.detail-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: var(--spacing-lg);
}

.detail-item {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xs);
}

.detail-item-full {
  grid-column: 1 / -1;
}

.detail-label {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--color-gray-600);
}

.detail-value {
  font-size: 1rem;
  color: var(--color-gray-900);
  font-weight: 500;
  word-break: break-word;
}

.actions-bar {
  display: flex;
  gap: var(--spacing-md);
  justify-content: flex-end;
  margin-top: var(--spacing-lg);
}

.error-card {
  padding: var(--spacing-xl);
}

@media (max-width: 768px) {
  .detail-grid {
    grid-template-columns: 1fr;
  }

  .actions-bar {
    flex-direction: column;
  }

  .actions-bar > * {
    width: 100%;
  }
}
</style>

