ansible_exists := $(shell ansible-playbook --version)
ansible_check:
ifndef ansible_exists
		@echo "Ansible is not installed. Installing Ansible"
		brew install ansible
else
		@echo "Ansible is installed"
endif

install: ansible_check
	ansible-playbook setup/dev.yml -i setup/local

run-android:
	ANDROID_HOME=/usr/local/opt/android-sdk react-native run-android

run-packager:
	REACT_EDITOR=atom ./node_modules/react-native/packager/packager.sh start --reset-cache

deps:
	npm install

test:
	npm test

coverage:
	npm run coverage

ci-install:
	@echo "Provisioning CI"
	@echo "Removing node modules"
	rm -rf node_modules/
	download-android
	./install_android_libs.sh

ci-test:
	@echo "Running Tests on CI"
	rm -rf node_modules/
	make deps
	make test
	make coverage
	npm install -g codeclimate-test-reporter
	codeclimate-test-reporter < coverage/lcov.info


release:
	cd android; ./gradlew assembleRelease

log:
	adb logcat *:S ReactNative:V ReactNativeJS:V

uninstall:
	adb uninstall com.facilitiesassessment

reinstall: uninstall run-android

ts := $(shell /bin/date "+%Y-%m-%d---%H-%M-%S")