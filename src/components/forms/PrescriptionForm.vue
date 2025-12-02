<template>
  <div class="modal-overlay" @click.self="$emit('close')">
    <div class="modal">
      <div class="modal-header">
        <h3 class="modal-title">{{ isEdit ? 'Editar Prescrição' : 'Nova Prescrição' }}</h3>
        <button class="modal-close" @click="$emit('close')">
          <Icon name="x" :size="20" />
        </button>
      </div>
      <div class="modal-body">
        <form @submit.prevent="handleSubmit" class="modal-form">
          <div class="form-grid">
            <Input
              id="medication"
              label="Medicamento"
              v-model="form.medication"
              :error="errors.medication"
              icon="pill"
              placeholder="Nome do medicamento"
              required
            />

            <div class="input-group input-group-full">
              <label class="input-label" for="dosage">
                <span class="label-text">
                  Dosagem
                  <span class="required-asterisk">*</span>
                </span>
              </label>
              <div class="input-wrapper">
                <Icon name="syringe" :size="18" class="input-icon" />
                <textarea
                  id="dosage"
                  class="input input-with-icon"
                  v-model="form.dosage"
                  rows="2"
                  placeholder="Ex: 1 comprimido a cada 8 horas"
                  required
                ></textarea>
              </div>
              <span v-if="errors.dosage" class="error-message">
                <Icon name="alert-circle" :size="14" />
                {{ errors.dosage }}
              </span>
            </div>


            <div class="input-group input-group-full">
              <label class="input-label" for="notes">
                <span class="label-text">Observações</span>
              </label>
              <div class="input-wrapper">
                <Icon name="file-text" :size="18" class="input-icon" />
                <textarea
                  id="notes"
                  class="input input-with-icon"
                  v-model="form.notes"
                  rows="3"
                  placeholder="Adicione observações sobre a prescrição..."
                ></textarea>
              </div>
            </div>
          </div>

          <div class="modal-footer">
            <Button variant="secondary" icon="x" @click="$emit('close')">
              Cancelar
            </Button>
            <Button type="submit" :loading="loading" icon="save">
              {{ loading ? 'Salvando...' : 'Salvar' }}
            </Button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, computed, watch } from 'vue'
import Input from '@/components/common/Input.vue'
import Button from '@/components/common/Button.vue'
import Icon from '@/components/common/Icon.vue'
import { usePrescriptions } from '@/composables/usePrescriptions'
import { useToast } from '@/composables/useToast'
import { useFormValidation } from '@/composables/useFormValidation'

const toast = useToast()

const props = defineProps({
  petId: {
    type: [String, Number],
    required: true
  },
  prescriptionId: {
    type: [String, Number],
    default: null
  }
})

const emit = defineEmits(['close', 'saved'])

const { prescription, loading, fetchPrescription, createPrescription, updatePrescription } = usePrescriptions()

const isEdit = computed(() => !!props.prescriptionId)

const form = reactive({
  medication: '',
  dosage: '',
  notes: ''
})

const validationSchema = {
  medication: ['required', 'minLength:2'],
  dosage: ['required', 'minLength:2']
}

const { errors, validate, clearErrors } = useFormValidation(validationSchema)

const handleSubmit = async () => {
  clearErrors()

  if (!validate(form)) {
    return
  }

  try {
    const data = {
      medicationName: form.medication,
      dosage: form.dosage,
      instructions: form.notes || '',
      petId: parseInt(props.petId)
    }

    if (isEdit.value) {
      await updatePrescription(props.prescriptionId, data)
    } else {
      await createPrescription(data)
    }
    emit('saved')
    emit('close')
    toast.success(isEdit.value ? 'Prescrição atualizada com sucesso!' : 'Prescrição registrada com sucesso!')
  } catch (err) {
    console.error('Erro ao salvar prescrição:', err)
    toast.error('Erro ao salvar prescrição. Tente novamente.')
  }
}

watch(() => props.prescriptionId, async (newId) => {
  if (newId) {
    await fetchPrescription(newId)
    if (prescription.value) {
      form.medication = prescription.value.medicationName || prescription.value.medication || ''
      form.dosage = prescription.value.dosage || ''
      form.notes = prescription.value.instructions || prescription.value.notes || ''
      // Removido startDate, endDate e veterinarian pois não existem no backend
    }
  } else {
    // Limpar formulário quando não há ID (modo criar)
    form.medication = ''
    form.dosage = ''
    form.notes = ''
  }
}, { immediate: true })
</script>

<style scoped>
.modal-form {
  width: 100%;
}

.form-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--spacing-lg);
}

.input-group-full {
  grid-column: 1 / -1;
}

.spinning {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

@media (max-width: 640px) {
  .form-grid {
    grid-template-columns: 1fr;
  }
}
</style>

