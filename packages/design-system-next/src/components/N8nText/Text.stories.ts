import type { StoryFn } from '@storybook/vue';
import { N8nText } from './index';

export default {
	title: 'Atoms/Text',
	component: N8nText,
	argTypes: {
		size: {
			control: {
				type: 'select',
				options: ['xsmall', 'small', 'medium', 'large'],
			},
		},
		color: {
			control: {
				type: 'select',
				options: [
					'primary',
					'text-dark',
					'text-base',
					'text-light',
					'text-xlight',
					'danger',
					'success',
				],
			},
		},
	},
};

const Template: StoryFn = (args, { argTypes }) => ({
	props: Object.keys(argTypes),
	components: {
		N8nText,
	},
	template: '<n8n-text v-bind="$props">hello world</n8n-text>',
});

export const Text = Template.bind({});
