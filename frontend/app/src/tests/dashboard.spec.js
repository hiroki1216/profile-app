import { mount } from '@vue/test-utils'
import { nextTick } from 'vue'
import Dashboard from '../components/admin/Dashboard.vue' 
import Input from '../components/common/Input.vue'
import DisplayHtml from '../components/common/DisplayHtml.vue'
import useAbout from '../composable/useAbout.ts'
import useWork from '../composable/useWork.ts'
import { useRouter, useRoute } from 'vue-router'
import DangerButton from '../components/common/DangerButton.vue'
import GreenButton from '../components/common/GreenButton.vue'
import PencilSquareIcon from '@heroicons/vue/24/outline'
import TrashIcon from '@heroicons/vue/24/outline'

//vue-routerのモック
jest.mock('vue-router', () => ({
  useRouter: jest.fn(() => ({
    push: () => {},
  })),
  useRoute: jest.fn(() => ({
    params: { 
      id: 1
    }
  })),
}))

jest.mock('../composable/useAbout.ts'); //useAboutのモック
jest.mock('../composable/useWork.ts'); //useWorkのモック

describe('Dashboard画面', () => {
  const about = {
    value: { 
      name: "",
      introduction: "",
      certification: "",
      speciality: "",
      experiences: "",
      strength: "",
    }
  }
  const initialAbout = {
    value: { 
      name: "alice",
      introduction: "hello",
      certification: "cool skill",
      speciality: "cool speciality",
      experiences: "cool experiences",
      strength: "cool strength",
    } 
  }
  const works = {
    value: []
  }
  const initialWorks = {
    value: {
      0:
      {
        projectName: "project hoge",
        language: "go",
        framework: "echo",
        tool: "vs code",
        introduction: "cool app",
        responsible: "backend",
        acquiredSkill: "go vue",
      },
      1:
      {
          projectName: "project piyo",
          language: "php",
          framework: "laravel",
          tool: "vs code",
          introduction: "cool app",
          responsible: "backend",
          acquiredSkill: "php vue",
      },
    }
  }
  const nilAbout = {
    value: {
      data: "nil"
    }
  }
  const emptyWorks = {
    value: []
  }
  it('マウント時に初期化処理により、既存データで初期化されること', async () => {
    const mockGetAbout = jest.fn().mockResolvedValue(initialAbout)
    useAbout.mockImplementation(() => ({
      about: about,
      getAbout: mockGetAbout,
    }))

    const mockGetWorks = jest.fn().mockResolvedValue(initialWorks)
    useWork.mockImplementation(() => ({
      works: works,
      getWorks: mockGetWorks,
    }))

    const push = jest.fn()
    useRouter.mockImplementationOnce(() => ({
      push: push
    }))
    
    const wrapper = mount(Dashboard)
    //getWork()の処理完了を待つ
    await wrapper.vm.getAbout();
    await wrapper.vm.getWorks();
    expect(mockGetWorks).toHaveBeenCalled()
    expect(mockGetAbout).toHaveBeenCalled()
    await nextTick()
    expect(wrapper.vm.isNil).toBe(false);
    expect(wrapper.vm.isEmpty).toBe(false);
    expect(wrapper.vm.about).toStrictEqual(initialAbout)
    expect(wrapper.vm.works).toStrictEqual(initialWorks)
  });
  it('既存データが存在する場合は、既存データを表示すること', async () => {
    const wrapper = mount(Dashboard)
    //onMountedの処理完了を待つ
    await wrapper.vm.getAbout();
    await wrapper.vm.getWorks();
    await nextTick()
    //works
    expect(wrapper.vm.isEmpty).toBe(false)
    expect(wrapper.find("li").text()).toBe("projectName:")
    expect(wrapper.findComponent(TrashIcon))//削除ボタン
    expect(wrapper.findComponent(PencilSquareIcon))//編集ボタン
    //about
    expect(wrapper.vm.isNil).toBe(false)
    const inputComponents = wrapper.findAllComponents(Input)
    expect(inputComponents.length).toBe(3)
    const displayHtmlComponents = wrapper.findAllComponents(DisplayHtml)
    expect(displayHtmlComponents.length).toBe(3)
    const greenButtonComponents = wrapper.findAllComponents(GreenButton)
    expect(greenButtonComponents.length).toBe(2)
    const dangerButtonComponents = wrapper.findAllComponents(DangerButton)
    expect(dangerButtonComponents.length).toBe(1)
  });
  it('ボタンをクリックした時に、処理が呼ばれること', async () => {
    const push = jest.fn()
    useRouter.mockImplementationOnce(() => ({
      push: push
    }))
    
    const wrapper = mount(Dashboard)
    //getWork()の処理完了を待つ
    await wrapper.vm.getAbout();
    await wrapper.vm.getWorks();
    await nextTick()

    //更新系のボタンクリック処理
    const spyFetchWorkData = jest.spyOn(wrapper.vm, 'fetchWorkData');
    wrapper.vm.deleteWorkData = jest.fn();

    //更新系のボタンが存在すること
    expect(wrapper.find("#About編集ボタン").exists()).toBe(true);
    expect(wrapper.find("#Work編集ボタン").exists()).toBe(true);
    expect(wrapper.find("#Work削除ボタン").exists()).toBe(true);
    //about更新
    await wrapper.find("#About編集ボタン").trigger("click");
    expect(push).toHaveBeenCalledWith({ name: 'about'});

    //work更新
    await wrapper.find("#Work編集ボタン").trigger("click");
    expect(spyFetchWorkData).toHaveBeenCalled();

    //work削除
    await wrapper.find("#Work削除ボタン").trigger("click");
    expect( wrapper.vm.deleteWorkData).toHaveBeenCalled();
  });
  it('既存データが存在しない場合は、既存データが存在しない旨表示すること', async () => {
    const mockGetAbout = jest.fn().mockResolvedValue(nilAbout)
    useAbout.mockImplementation(() => ({
      about: about,
      getAbout: mockGetAbout,
    }))

    const mockGetWorks = jest.fn().mockResolvedValue(emptyWorks)
    useWork.mockImplementation(() => ({
      works: works,
      getWorks: mockGetWorks,
    }))

    const push = jest.fn()
    useRouter.mockImplementationOnce(() => ({
      push: push
    }))
    const wrapper = mount(Dashboard)
    //onMountedの処理完了を待つ
    await wrapper.vm.getAbout();
    await wrapper.vm.getWorks();
    await nextTick();
    expect(mockGetWorks).toHaveBeenCalled();
    expect(mockGetAbout).toHaveBeenCalled();
    expect(wrapper.vm.isNil).toBe(true);
    expect(wrapper.vm.isEmpty).toBe(true);
    expect(wrapper.find("#isEmptyWorks").text()).toBe("Worksが登録されていません。")
    expect(wrapper.find("#isNilAbout").text()).toBe("Aboutが登録されていません。")
  });
});