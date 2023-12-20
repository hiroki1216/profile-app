import { mount,flushPromises } from '@vue/test-utils'
import { nextTick } from 'vue'
import WorkNew from '../components/admin/WorkNew.vue' 
import Input from '../components/common/Input.vue'
import Textarea from '../components/common/Textarea.vue'
import PrimaryButton from '../components/common/PrimaryButton.vue'
import useWork from '../composable/useWork.ts'
import { useRouter } from 'vue-router'

jest.mock('vue-router', () => ({
  useRouter: jest.fn(() => ({
    push: () => {},
  }))
}))
 
jest.mock('../composable/useWork.ts'); 

describe('Work登録画面', () => {
  const work = {
    value: {
      projectName: "",
      language: "",
      framework: "",
      tool: "",
      introduction: "",
      responsible: "",
      acquiredSkill: "",
    }
  }
  it('work登録画面でworkの値が登録され、登録後に編集画面に遷移すること', async () => {
    const mockCreateWork = jest.fn().mockResolvedValue({
      value: {
        ID: 1
      }
    })
    useWork.mockImplementation(() => ({
      work: work,
      createWork: mockCreateWork,
    }))
    const push = jest.fn();
    useRouter.mockImplementationOnce(() => ({
      push: push
    }))
    const wrapper = mount(WorkNew)
    await nextTick()
    expect(wrapper.find("h2").text()).toBe("Work登録画面")
    expect(wrapper.find("button").text()).toBe("登録")
    expect(wrapper.find("#プロジェクト名").exists()).toBe(true);
    //プロジェクトを登録する
    await wrapper.find("#プロジェクト名").setValue("project1")
    await wrapper.find("#プロジェクト名").trigger("input")
    expect(wrapper.vm.work.value.projectName).toBe("project1")
    //登録処理
    wrapper.vm.v$.$validate = jest.fn().mockResolvedValue(true)
    await wrapper.find("button").trigger("click")
    expect(mockCreateWork).toHaveBeenCalled()
    //adminDashboardに遷移すること
    await flushPromises()
    expect(push).toHaveBeenCalledWith(expect.objectContaining({ name: 'workEdit', params: { id: 1 } }));
  });
  it('正しい数の子コンポーネントが表示されること', async () => {
    const wrapper = mount(WorkNew)
    const inputComponents = wrapper.findAllComponents(Input)
    const textareaComponents = wrapper.findAllComponents(Textarea)
    const primaryButtons = wrapper.findAllComponents(PrimaryButton)
    expect(inputComponents.length).toBe(4)
    expect(textareaComponents.length).toBe(3)
    expect(primaryButtons.length).toBe(1)
  });
});