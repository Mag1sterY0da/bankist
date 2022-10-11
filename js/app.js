'use strict';

// BANKIST APP

// Data

// DIFFERENT DATA! Contains movement dates, currency and locale

const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [
    {
      value: 200,
      date: '2021-11-18T21:31:17.178Z',
      id: 1
    },
    {
      value: 455.23,
      date: '2021-12-23T07:42:02.383Z',
      id: 2
    },
    {
      value: -306.5,
      date: '2022-01-28T09:15:04.904Z',
      id: 3
    },
    {
      value: 25000,
      date: '2022-04-01T10:17:24.185Z',
      id: 4
    },
    {
      value: -642.21,
      date: '2022-05-08T14:11:59.604Z',
      id: 5
    },
    {
      value: -133.9,
      date: '2022-05-27T17:01:17.194Z',
      id: 6
    },
    {
      value: 79.97,
      date: '2022-06-11T23:36:17.929Z',
      id: 7
    },
    {
      value: 1300,
      date: '2022-06-12T10:51:36.790Z',
      id: 8
    },
    {
      value: -34,
      date: '2022-06-18T10:51:36.790Z',
      id: 9
    },
    {
      value: -55,
      date: '2022-06-20T10:51:36.790Z',
      id: 10
    },
    {
      value: 133,
      date: '2022-06-21T10:51:36.790Z',
      id: 11
    }
  ],
  interestRate: 1.2, // %
  pin: 1111,
  currency: 'EUR',
  locale: 'pt-PT' // de-DE
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [
    {
      value: 5000,
      date: '2021-11-01T13:15:33.035Z',
      id: 1
    },
    {
      value: 3400,
      date: '2021-11-30T09:48:16.867Z',
      id: 2
    },
    {
      value: -150,
      date: '2021-12-25T06:04:23.907Z',
      id: 3
    },
    {
      value: -790,
      date: '2022-01-25T14:18:46.235Z',
      id: 4
    },
    {
      value: -3210,
      date: '2022-02-05T16:33:06.386Z',
      id: 5
    },
    {
      value: -1000,
      date: '2022-04-10T14:43:26.374Z',
      id: 6
    },
    {
      value: 8500,
      date: '2022-06-20T18:49:59.371Z',
      id: 7
    },
    {
      value: -30,
      date: '2022-06-21T12:01:20.894Z',
      id: 8
    }
  ],
  interestRate: 1.5,
  pin: 2222,

  currency: 'USD',
  locale: 'en-US'
};

const accounts = [account1, account2];

// Rate from one currency to another
const exchangeRate = {
  USD: {
    EUR: 0.9
  },
  EUR: {
    USD: 1.1
  }
};

/// Elements

const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

/// Functions

const formatMovementDate = (date, locale) => {
  const calcDaysPassed = (date1, date2) =>
    Math.round(Math.abs(date2 - date1) / (1000 * 60 * 60 * 24));
  const daysPassed = calcDaysPassed(new Date(), date);
  if (daysPassed === 0) return 'Today';
  else if (daysPassed === 1) return 'Yesterday';
  else if (daysPassed <= 7) return `${daysPassed} days ago`;
  else return new Intl.DateTimeFormat(locale).format(date);
};

const formatCur = (value, locale, currency) =>
  new Intl.NumberFormat(locale, {
    style: 'currency',
    currency
  }).format(value);

const displayMovements = (acc, sort = false) => {
  containerMovements.innerHTML = '';
  const movs = sort
    ? acc.movements.slice().sort((a, b) => a.value - b.value)
    : acc.movements;
  movs.forEach((mov) => {
    const type = mov.value > 0 ? 'deposit' : 'withdrawal';

    const date = new Date(mov.date);
    const displayDate = formatMovementDate(date, acc.locale);

    const formattedMov = formatCur(mov.value, acc.locale, acc.currency);
    // TODO DOM manipulation instead creating HTML code
    // TODO Beautiful popup windows
    const html = `<div class='movements__row'>
                    <div class='movements__type movements__type--${type}'>${mov.id} ${type}</div>
                     <div class='movements__date'>${displayDate}</div>
                    <div class='movements__value'>${formattedMov}</div>
                  </div>`;
    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

const calcDisplayBalance = acc => {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov.value, 0);
  labelBalance.textContent = formatCur(acc.balance, acc.locale, acc.currency);
};

const calcDisplaySummary = acc => {
  const incomes = acc.movements
    .filter(mov => mov.value > 0)
    .reduce((acc, mov) => acc + mov.value, 0);
  labelSumIn.textContent = formatCur(incomes, acc.locale, acc.currency);

  const out = acc.movements
    .filter(mov => mov.value < 0)
    .reduce((acc, mov) => acc + mov.value, 0);
  labelSumOut.textContent = formatCur(Math.abs(out), acc.locale, acc.currency);

  const interest = acc.movements
    .filter(mov => mov.value > 0)
    .map(deposit => (deposit.value * acc.interestRate) / 100)
    .filter(int => int >= 1)
    .reduce((acc, int) => acc + int, 0);
  labelSumInterest.textContent = formatCur(interest, acc.locale, acc.currency);
};

const createUsernames = accs => {
  accs.forEach(acc => {
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map(name => name[0])
      .join('');
  });
};

createUsernames(accounts);

const updateUi = acc => {
  // Display movements
  displayMovements(acc);
  // Display balance
  calcDisplayBalance(acc);
  // Display summary
  calcDisplaySummary(acc);
};

const calcTransfer = (value, senderCur, receiverCur) =>
  senderCur === receiverCur
    ? value
    : value * exchangeRate[senderCur][receiverCur];

const createTransfer = (value, id) => ({
  value,
  date: new Date().toISOString(),
  id
});

const startLogOutTimer = () => {
  const tick = () => {
    const min = String(Math.trunc(time / 60)).padStart(2, '0');
    const sec = String(time % 60).padStart(2, '0');
    labelTimer.textContent = `${min}:${sec}`;
    // When 0 second, stop timer and log out user
    if (time === 0) {
      clearInterval(timer);
      labelWelcome.textContent = 'Log in to get started';
      containerApp.style.opacity = '0';
    }
    time--;
  };
  let time = 300;
  const timer = setInterval(tick, 1000);

  return timer;
};

/// Event Handlers
let currentAccount, timer;
// Check if movements are sorted
let sorted = false;

btnLogin.addEventListener('click', e => {
  e.preventDefault();
  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );
  if (currentAccount?.pin === +inputLoginPin.value) {
    // Display UI and message
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(' ')[0]
    }`;
    containerApp.style.opacity = '100';
    // Display current time and date
    const now = new Date();
    const options = {
      hour: 'numeric',
      minute: 'numeric',
      day: 'numeric',
      month: 'numeric',
      year: 'numeric'
    };
    labelDate.textContent = new Intl.DateTimeFormat(
      currentAccount.locale,
      options
    ).format(now);
    // Clear input fields
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();
    // Start logout timer
    if (timer) clearInterval(timer);
    timer = startLogOutTimer();
    // Update UI
    updateUi(currentAccount);
  }
});

btnTransfer.addEventListener('click', e => {
  e.preventDefault();
  const amount = +inputTransferAmount.value;
  const receiverAcc = accounts.find(
    acc => acc.username === inputTransferTo.value
  );
  inputTransferAmount.value = inputTransferTo.value = '';
  if (
    amount > 0 &&
    receiverAcc &&
    currentAccount.balance >= amount &&
    receiverAcc?.username !== currentAccount.username
  ) {
    // Begin of transfer
    currentAccount.movements.push(
      createTransfer(-amount, currentAccount.movements.length + 1)
    );
    receiverAcc.movements.push(
      createTransfer(
        calcTransfer(amount, currentAccount.currency, receiverAcc.currency),
        receiverAcc.movements.length + 1
      )
    );
    // Update UI
    updateUi(currentAccount);
    // Reset timer
    clearInterval(timer);
    timer = startLogOutTimer();
  }
});

btnLoan.addEventListener('click', e => {
  e.preventDefault();

  const amount = Math.floor(inputLoanAmount.value);
  if (
    amount > 0 &&
    currentAccount.movements.some(mov => mov.value >= amount * 0.1)
  ) {
    setTimeout(() => {
      // Add movement
      currentAccount.movements.push(
        createTransfer(amount, currentAccount.movements.length + 1)
      );
      // Update UI
      updateUi(currentAccount);
      // Reset timer
      clearInterval(timer);
      timer = startLogOutTimer();
    }, 2500);
  }
  inputLoanAmount.value = '';
});

btnClose.addEventListener('click', e => {
  e.preventDefault();

  if (
    inputCloseUsername.value === currentAccount.username &&
    +inputClosePin.value === currentAccount.pin
  ) {
    const index = accounts.findIndex(
      acc => acc.username === currentAccount.username
    );
    // Delete account
    accounts.splice(index, 1);
    // Hide UI
    containerApp.style.opacity = '0';
  }
  inputCloseUsername.value = inputClosePin.value = '';
  labelWelcome.textContent = 'Log in to get started';
  if (timer) clearInterval(timer);
});

btnSort.addEventListener('click', e => {
  e.preventDefault();
  displayMovements(currentAccount, !sorted);
  sorted = !sorted;
});
