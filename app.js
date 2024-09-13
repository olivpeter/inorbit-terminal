const { select, input, checkbox } = require('@inquirer/prompts')
const { readFile, writeFile } = require('node:fs').promises

let message = 'InOrbit Terminal | What do you want to do?'
let goals

async function loadGoals() {
	try {
		const data = await readFile('goals.json', 'utf8')

		goals = JSON.parse(data)
	} catch (error) {
		goals = []
	}
}

async function saveGoals() {
	await writeFile('goals.json', JSON.stringify(goals, null, 2))
}

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
	if (goals.length === 0) {
		message = '🙃 No goals yet'
		return
	}

	const answers = await checkbox({
		message: 'Select the goals you want to complete:',
		choices: [...goals],
		instructions: false,
	})

	goals.forEach(g => {
		g.checked = false
	})

	if (answers.length === 0) {
		message = '⚠️ No goals were selected'
		return
	}

	answers.forEach(answer => {
		const goal = goals.find(g => {
			return g.value === answer
		})

		goal.checked = true
	})

	message = '✅ Goal(s) marked as completed'
}

async function editGoals() {}

async function removeGoals() {
	if (goals.length === 0) {
		message = '🙃 No goals yet'
		return
	}

	const unmarkedGoals = goals.map(goal => {
		return { value: goal.value, checked: false }
	})

	const goalsToBeDeleted = await checkbox({
		message: 'Select the goals you want to delete:',
		choices: [...unmarkedGoals],
		instructions: false,
	})

	if (goalsToBeDeleted.length === 0) {
		message = '⚠️ No goals to be deleted'
		return
	}

	goalsToBeDeleted.forEach(item => {
		goals = goals.filter(goal => {
			return goal.value !== item
		})
	})

	message = '✅ Goal(s) deleted'
}

async function openGoals() {
	if (goals.length === 0) {
		message = '🙃 No goals yet'
		return
	}

	const open = goals.filter(goal => {
		return !goal.checked
	})

	if (open.length === 0) {
		message = '🥳 No goals are open'
		return
	}

	await select({
		message: `Open goals: (${open.length})`,
		choices: [...open],
	})
}

async function completedGoals() {
	if (goals.length === 0) {
		message = '🙃 No goals yet'
		return
	}

	const completed = goals.filter(goal => {
		return goal.checked
	})

	if (completed.length === 0) {
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
	if (message !== '') {
		console.log(`${message}\n`)
		message = ''
	}
}

async function start() {
	await loadGoals()

	while (true) {
		showMessage()
		await saveGoals()

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
					name: 'Edit goals',
					value: 'edit',
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

			case 'edit':
				await editGoals()
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
