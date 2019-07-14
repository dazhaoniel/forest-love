<template>
  <div>
    <div v-for="(line, index) in lines" v-bind:key="index" class="form-row">
      <!-- From -->
      <div class="col">
        <label for="inlineFormInput">From</label>
        <input type="text" class="form-control" placeholder="From">
      </div>
      <!-- To -->
      <div class="col">
        <label for="inlineFormInput">To</label>
        <input type="text" class="form-control" placeholder="To">
      </div>
      <!-- Checkbox for roundtrip -->
      <div class="col-auto">
        <!-- <div class="form-radio mb-2"> -->
          <input class="form-check-input" type="radio" id="autoSizingCheck">
          <label>Roundtrip</label>
        <!-- </div> -->
      </div>
      <!-- + button to add new line -->
      <div class="col">
        <div class="block float-right">
          <q-btn @click="removeLine(index)" icon="delete" round />
          <q-btn v-if="index + 1 === lines.length" @click="addLine" icon="playlist-plus" round />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FromToLine',
  data () {
    return {
      lines: [],
      blockRemoval: true,
      phoneUsageTypes: [
        {
          label: 'Home', 'home'
        }, {
          label: 'Work', value: 'work'
        }, {
          label: 'Mobile', value: 'mobile'
        }, {
          label: 'Fax', value: 'fax'
        }
      ],
      countryPhoneCodes: [
        {
          label: '+90',
          value: '+90'
        }, {
          label: '+1',
          value: '+1'
        }
      ]
    }
  },
  watch: {
    lines () {
      this.blockRemoval = this.lines.length <= 1
    }
  },
  methods: {
    addLine () {
      let checkEmptyLines = this.lines.filter(line => line.number === null)

      if (checkEmptyLines.length >= 1 && this.lines.length > 0) return

      this.lines.push({
        countryCode: null,
        number: null,
        phoneUsageType: null
      })
    },

    removeLine (lineId) {
      if (!this.blockRemoval) this.lines.splice(lineId, 1)
    }
  },
  mounted () {
    this.addLine()
  }
}
</script>