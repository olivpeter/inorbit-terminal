const { select, input, checkbox } = require('@inquirer/prompts')

let message = 'InOrbit Terminal | What do you want to do?'
let goals = [{ value: 'Learn Javascript', checked: false }]

async function addGoal() {
    const goal = await input({ message: 'What is your goal?' })

    if (!goal) {
        message = '⚠️ Please enter a goal'
        return
    }

    goals.push({ value: goal, checked: false })

    message = `✅ Added goal: ${goal}`
}

async function listGoals() {
    const answers = await checkbox({
        message: 'Select the goals you want to complete:',
        choices: [...goals],
        instructions: false,
    })

    goals.forEach((g) => {
        g.checked = false
    })

    if (answers.length == 0) {
        message = '⚠️ No goals were selected'
        return
    }

    answers.forEach((answer) => {
        const goal = goals.find((g) => {
            return g.value == answer
        })

        goal.checked = true
    })

    message = '✅ Goal(s) marked as completed'
}

async function removeGoals() {
    const unmarkedGoals = goals.map((goal) => {
        return { value: goal.value, checked: false }
    })

    const goalsToBeDeleted = await checkbox({
        message: 'Select the goals you want to delete:',
        choices: [...unmarkedGoals],
        instructions: false,
    })

    if (goalsToBeDeleted.length == 0) {
        message = '⚠️ No goals to be deleted'
        return
    }

    goalsToBeDeleted.forEach((item) => {
        goals = goals.filter((goal) => {
            return goal.value != item
        })
    })

    message = '✅ Goal(s) deleted'
}

async function openGoals() {
    const open = goals.filter((goal) => {
        return !goal.checked
    })

    if (open.length == 0) {
        message = '🥳 No goals are open'
        return
    }

    await select({
        message: `Open goals: (${open.length})`,
        choices: [...open],
    })
}

async function completedGoals() {
    const completed = goals.filter((goal) => {
        return goal.checked
    })

    if (completed.length == 0) {
        message = '😒 No goals were completed'
        return
    }

    await select({
        message: `Completed goals: (${completed.length})`,
        choices: [...completed],
    })
}

function showMessage() {
    console.clear()
    if (message != '') {
        console.log(`${message}\n`)
        message = ''
    }
}

async function start() {
    while (true) {
        showMessage()

        const option = await select({
            message: 'Menu >',
            choices: [
                {
                    name: 'Add goal',
                    value: 'add',
                },
                {
                    name: 'List goals',
                    value: 'list',
                },
                {
                    name: 'Open goals',
                    value: 'open',
                },
                {
                    name: 'Goals completed',
                    value: 'completed',
                },
                {
                    name: 'Remove goals',
                    value: 'remove',
                },
                {
                    name: 'Leave',
                    value: 'leave',
                },
            ],
        })

        switch (option) {
            case 'add':
                await addGoal()
                break

            case 'list':
                await listGoals()
                break

            case 'remove':
                await removeGoals()
                break

            case 'open':
                await openGoals()
                break

            case 'completed':
                await completedGoals()
                break

            case 'leave':
                console.log('👋 Ok. See ya!')
                return
        }
    }
}

start()
