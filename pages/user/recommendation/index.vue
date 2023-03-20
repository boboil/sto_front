<template>
  <div>
    <Header/>
    <div id="acts_works">
      <section class="block-work-acts">
        <div class="wrap">
          <h1 class="block-title">
            Мій гаманець послуг
          </h1>
          <span>
            <p>
              Натискайте  + ,
              обирайте та попередньо сплачуйте  за деякі послуги,
              або цілі комплекси - це дасть вам можливість заощадити,
              а нам натхнення до ще більших звершень :)
            </p>
            <p>
              *Додані послуги в "Мій гаманець послуг"
              можно використати в будь який час та на будь який
              автомобіль.
            </p>
          </span>
          <div class="work-acts-chronology">

            <div class="work-acts-year">
              <div class="work-acts-year-title">
                Є в гаманці
              </div>
              <div class="work-acts-year-list">
                <div class="list-inner">
                  <a href="#"
                     class="act-item d-flex align-items-center justify-content-center a5eca5">
                    <div class="subtitle">
                    </div>
                    <div class="value">
                      <span class="d-flex align-items-center">
                        <i class="fa fa-plus fa-2x pr-3"></i>
                        Додати
                      </span>
                    </div>
                    <div class="value"></div>
                  </a>

                  <a href="#" class="act-item">
                    <div class="subtitle">
                    </div>
                    <div class="value">

                    </div>
                    <div class="value">
                      Name
                    </div>
                    <div class="subtitle">
                      Дата:
                    </div>
                    <div class="value">
                      Date
                    </div>
                    <div class="value mt-3 text-center">
                      <button type="button" data-id="id"
                              data-name="Name" class="btn btn-info"
                              id="addCartProduct"
                              @onclick="useTalon">
                        Використати
                      </button>
                    </div>
                  </a>

                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import Header from "~/components/Common/Layout/Header.vue";

export default {
  name: "Talons",
  components: {Header},
  data(){
    return {}
  },
  methods: {
    useTalon() {

    }
  }
}
</script>

<style scoped>

</style>
