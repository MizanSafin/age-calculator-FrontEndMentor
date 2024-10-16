const day = document.getElementById("day")
const month = document.getElementById("month")
const year = document.getElementById("year")

const errorDay = document.querySelector(".error-day")
const errorMonth = document.querySelector(".error-month")
const errorYear = document.querySelector(".error-year")

const btnEl = document.querySelector(".btn")

const outputYear = document.querySelector(".output-year")
const outputMonth = document.querySelector(".output-month")
const outputDay = document.querySelector(".output-day")

const inputEls = document.querySelectorAll(".input-box input")
const labels = document.querySelectorAll(".input-box label")

let changeBtnPosition = false

let now = new Date(Date.now())
let yearNow = now.getFullYear()

function validateInputValue() {
  if (day.value.trim() === "") {
    errorDay.classList.add("show")
    changeBtnPosition = true
  }
  if (month.value.trim() === "") {
    errorMonth.classList.add("show")
    changeBtnPosition = true
  }
  if (year.value.trim() === "") {
    errorYear.classList.add("show")
    changeBtnPosition = true
  }
  if ((day.value && Number(day.value) <= 0) || Number(day.value) > 31) {
    errorDay.classList.add("show")
    errorDay.innerHTML = `Must be a valid day`
    changeBtnPosition = true
  }
  if ((month.value && Number(month.value) <= 0) || Number(month.value) > 12) {
    errorMonth.classList.add("show")
    errorMonth.innerHTML = `Must be a valid month`
    changeBtnPosition = true
  }
  if ((year.value && Number(year.value) <= 0) || Number(year.value) > yearNow) {
    errorYear.classList.add("show")
    errorYear.innerHTML = `Must be in the past`
    changeBtnPosition = true
  }
}

btnEl.addEventListener("click", () => {
  validateInputValue()
  //   console.log(changeBtnPosition)
  if (changeBtnPosition) {
    btnEl.style.cssText = `margin-top:30px`
    changeColor()
    clearBirthDate()
  } else if (!changeBtnPosition) {
    showOutput()
    clearError()
  }
})

inputEls.forEach((input, index) => {
  input.addEventListener("input", (e) => {
    let smallEl = e.target.nextSibling.nextSibling
    smallEl.classList.remove("show")
    btnEl.style.cssText = `margin-top:0px`
    labels[index].classList.remove("error")
    input.classList.remove("error")
    changeBtnPosition = false
  })
})

function changeColor() {
  inputEls.forEach((input, index) => {
    input.classList.add("error")
    labels[index].classList.add("error")
  })
}

function showOutput() {
  let birthDay = `${year.value}-${month.value}-${day.value}`
  let birthDayObj = new Date(birthDay)
  let ageDiffMili = Date.now() - birthDayObj
  let ageDate = new Date(ageDiffMili)
  let ageYear = ageDate.getUTCFullYear() - 1970
  let ageMonth = ageDate.getUTCMonth()
  let ageDay = ageDate.getUTCDate() - 1
  showBirthDate(ageYear, ageMonth, ageDay)
}

function showBirthDate(year, month, day) {
  outputYear.innerHTML = `<h1> <span>${year}</span> ${year > 1 ? "years" : "year"} </h1>`
  outputMonth.innerHTML = `<h1><span>${month}</span> ${
    month > 1 ? "months" : "month"
  } </h1>`
  outputDay.innerHTML = `<h1><span>${day}</span> ${
    day > 1 ? "days" : "day"
  } </h1>`
}

function clearBirthDate() {
  outputYear.innerHTML = `<h1 class="output-year"><span>--</span>years</h1>`
  outputMonth.innerHTML = `<h1 class="output-month"><span>--</span>months</h1>`
  outputDay.innerHTML = `<h1 class="output-day"><span>--</span>days</h1>`
}

function clearError() {
  inputEls.forEach((input, index) => {
    input.classList.remove("error")
    labels[index].classList.remove("error")
  })
}
